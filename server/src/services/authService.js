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
const { verify } = require('jsonwebtoken');
const userProfile = require('../database/user');

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

        // console.log(adminConfirmSignUpResponse);

        // create user object in database
        const createdUser = await userProfile.createUser({
            authorizeSubId,
            language: "",
            currency: "",
            defaultAccount: "",
            defaultSortPeriod: ""
        });

        return {
            createdUser,
            // signUpCommandResponse
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

module.exports = {
    signUp
}