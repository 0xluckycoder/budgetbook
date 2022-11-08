const { 
    CognitoIdentityProvider, 
    SignUpCommand, 
    GetUserCommand,
    AdminGetUserCommand,
    AdminConfirmSignUpCommand,
    AdminInitiateAuthCommand,
    InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const nodemailer = require('nodemailer');
// const { verify } = require('jsonwebtoken');
const userProfile = require('../database/user');
const account = require('../database/account');

const signUp = async (user) => {
    
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });
    
        // register new user
        const signUpCommand = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: user.email,
            Password: user.password
        });
        const signUpCommandResponse = await client.send(signUpCommand);
        const authorizeSubId = signUpCommandResponse.UserSub;

        /*
            confirm the user without validating email for now
            once the SMTP server issue is fixed rewrite this
        */ 
        const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand({
            UserPoolId: process.env.AWS_USER_POOL_ID,
            Username: authorizeSubId
        });
        const adminConfirmSignUpResponse = await client.send(adminConfirmSignUpCommand);
        console.log('confirmed ✅', adminConfirmSignUpResponse);

        // create user profile attributes
        const createdUser = await userProfile.createUser({
            authorizeSubId,
            firstName: user.firstName,
            lastName: user.lastName,
            language: user.language,
            country: user.country,
            defaultSortPeriod: "thismonth"
        });
        console.log('user', createdUser);

        // create financial account for user
        const createdAccount = await account.createAccount({
            userId: createdUser._id,
            name: user.accountName,
            value: user.initialAmount,
            currencyType: user.currency,
            description: user.description
        });
        console.log('created financial account', createdAccount);

        // update defaultAccount on user profile object
        const updatedUser = await userProfile.updateUser({
            defaultAccount: createdAccount._id
        }, createdUser._id);
        console.log('updated user attribute', updatedUser);

        return {
            createdUser,
            adminConfirmSignUpResponse
        };

        // return signUpCommandResponse;

        /*
            {
                "success": true,
                "data": {
                    "$metadata": {
                        "httpStatusCode": 200,
                        "requestId": "09c5518d-eb8c-419b-a067-13b0dffc74b1",
                        "attempts": 1,
                        "totalRetryDelay": 0
                    },
                    "UserConfirmed": false,
                    "UserSub": "e34215f8-f695-49b1-a528-488be5320e19"
                }
            }
        */ 

    } catch (error) {
        throw error;
    }
}

const signIn = async (user) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // retrieve user tokens
        const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: user.email,
                PASSWORD: user.password
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            UserPoolId: process.env.AWS_USER_POOL_ID
        });

        const adminInitiateAuthResponse = await client.send(adminInitiateAuthCommand);

        // get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: adminInitiateAuthResponse.AuthenticationResult.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        // console.log(getUserResponse);

        // construct the response
        const email = getUserResponse.UserAttributes.find(element => element.Name === "email");
        const subId = getUserResponse.UserAttributes.find(element => element.Name === "sub");

        const data = {
            email: email.Value,
            subId: subId.Value
        }

        // const getUserAttributes = await userProfile.getUserBySubId(subId.Value);
        // console.log(getUserAttributes);
       
        /*
        {
            _id: new ObjectId("634f03ae14b08aff20a1db5e"),
            authorizeSubId: '8a834576-7950-41d4-9c24-821970f282c1',
            language: '',
            currency: '',
            defaultAccount: '',
            defaultSortPeriod: '',
            __v: 0
        }
        */

        // extract tokens
        const accessToken = adminInitiateAuthResponse.AuthenticationResult.AccessToken;
        const refreshToken = adminInitiateAuthResponse.AuthenticationResult.RefreshToken;
        const idToken = adminInitiateAuthResponse.AuthenticationResult.IdToken;

        return {
            data,
            tokens: {
                accessToken,
                refreshToken,
                idToken
            }
        }

    } catch (error) {
        throw error;
    }
}

const verifyAuth = async (cookies) => {
    try {

        // throw new Error('error');

        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // validate access token and get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: cookies.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        const email = getUserResponse.UserAttributes.find(element => element.Name === "email");
        const subId = getUserResponse.UserAttributes.find(element => element.Name === "sub");

        // const getUserAttributes = userProfile.getUserBySubId(subId);
        // console.log(getUserAttributes);

        const data = {
            email: email.Value,
            subId: subId.Value,
        }

        return data;
        
    } catch (error) {
        throw error;
    }
}

const refreshTokens = async (RefreshToken) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                REFRESH_TOKEN: RefreshToken,
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID
        });

        // retrieve refreshed access & id tokens
        const InitiateAuthCommandResponse = await client.send(command);
        console.log('new tokens assigned', InitiateAuthCommandResponse);
        return InitiateAuthCommandResponse;
        
    } catch (error) {
        console.log('when refreshing cuased error', error);
        throw error;
    }
}

const getUserAttributesBySubId = async (subId) => {
    try {
        const userAttributesBySubId = await userProfile.getUserBySubId(subId);
        return userAttributesBySubId;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signUp,
    signIn,
    verifyAuth,
    refreshTokens,
    getUserAttributesBySubId
}