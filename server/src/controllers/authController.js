const yup = require('yup');
const authService = require('../services/authService');

/**
 * @desc User sign up
 * @path POST /api/v1/auth/signup
 * @authorization Public
 * */
const signUp = async (req, res, next) => {
    try {
        console.log(req.body);

        // validate user input
        const userSchema = yup.object().shape({
            email: yup.string('email must be a string')
                    .required('email is required')
                    .max(127, 'email address is too long')
                    .email('not a valid email address'),
            password: yup.string('password must be a string')
                        .required('password is required')
                        .max(127, 'password is too long'),
            // attributes
            firstName: yup.string('firstName must be a string')
                            .required('firstName is required')
                            .max(127, 'firstName is too long'),
            lastName: yup.string('lastName must be a string')
                            .required('lastName is required')
                            .max(127, 'lastName is too long'),
            language: yup.string('language must be a string')
                            .required('language is required')
                            .max(127, 'language is too long'),
            country: yup.string('country must be a string')
                        .required('country is required')
                        .max(127, 'country is too long'),
            // user account
            accountName: yup.string('account name must be a string')
                            .required('account name is required')
                            .max(127, 'account name is too long'),
            initialAmount: yup.string('initial value must be a string')
                            .required('initial value is required')
                            .max(20, 'initial value is too long'),
            currency: yup.string('currency must be a string')
                            .required('currency is required')
                            .max(127, 'currency is too long'),
            description: yup.string('description must be a string')
                            .max(200, 'description is too long'),
        });

        const validated = await userSchema.validate(req.body);
        const signedUpResponse = await authService.signUp(validated);

        // success response
        res.status(200).json({
            success: true,
            data: signedUpResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc User sign in
 * @path POST /api/v1/auth/signin
 * @authorization Public
 * */
const signIn = async (req, res, next) => {
    try {
        console.log(req.body);

        // validate user input
        const userSchema = yup.object().shape({
            email: yup.string('email must be a string')
                    .required('email is required')
                    .max(127, 'email address is too long')
                    .email('not a valid email address'),
            password: yup.string('password must be a string')
                        .required('password is required')
                        .max(127, 'password is too long')
        });

        const validated = await userSchema.validate(req.body);

        // sign in the user
        const { tokens, data } = await authService.signIn(validated);

        // clear existing token cookies
        res.clearCookie('AccessToken');
        res.clearCookie('IdToken');
        res.clearCookie('RefreshToken');

        // set access token, refresh token, id token on client accordingly
        const cookiesConfig = {
            maxAge: 60000 * 60,
            httpOnly: true
        }

        res.cookie('AccessToken', tokens.accessToken, cookiesConfig);
        res.cookie('RefreshToken', tokens.refreshToken, cookiesConfig);
        res.cookie('IdToken', tokens.idToken, cookiesConfig);

        // mock data for testing
        // throw new Error('error occurred');
        // const data = {
        //     firstName: 'john',
        //     lastName: 'doe',
        //     profilePic: 'pictureUrl',
        //     email: 'info@email.com',
        //     subId: '111111111'
        // }

        console.log(tokens);

        // singin response
        res.status(200).json({
            success: true,
            data: data
        });

    } catch(error) {
        console.log(error);
        next(error);
    }
}

// const uploadImage = async (req, res, next) => {
//     try {
//     } catch(error) {
//         console.log(error);
//         next(error);
//     }
// }

const getUserAttributesBySubId = async (req, res, next) => {
    try {
        const { subId } = req.user;
        const response = await authService.getUserAttributesBySubId(subId);

        res.status(200).json({
            success: true,
            data: response
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc authenticate if cookies exists & Refresh expired tokens
 * @path POST /api/v1/auth/signin
 * @authorization Private
 * */
const verifyAuth = async (req, res, next) => {

    const { AccessToken, RefreshToken, IdToken } = req.cookies;

    try {
        // validate cookies
        if (!AccessToken || !RefreshToken || !IdToken) {
            const tokenUnavailableError = new Error('no cookies available');
            tokenUnavailableError.name = 'CookiesUnavailable';            
            throw tokenUnavailableError;
        }

        // get user data from cognito
        const verifyAuthResponse = await authService.verifyAuth(req.cookies);
        
        return res.status(200).json({
            success: true,
            data: verifyAuthResponse
        });

    } catch (error) {

        // if access token is expired reassign new access & id tokens to client
        // if access token is invalid throw error
        if (error.name === 'NotAuthorizedException') {
            try {
                const refreshedTokens = await authService.refreshTokens(RefreshToken);
                const cookiesConfig = {
                    maxAge: 60000 * 60,
                    httpOnly: true
                }

                // clear existing token cookies
                res.clearCookie('AccessToken');
                res.clearCookie('IdToken');

                // reassign new access & id token cookies
                res.cookie('AccessToken', refreshedTokens.AuthenticationResult.AccessToken, cookiesConfig);
                res.cookie('IdToken', refreshedTokens.AuthenticationResult.IdToken, cookiesConfig);

                // get the user data from cognito using refreshed token
                const verifyAuthResponse = await authService.verifyAuth({
                    AccessToken: refreshedTokens.AuthenticationResult.AccessToken
                });

                return res.json({
                    success: true,
                    data: verifyAuthResponse
                });
                
            } catch (error) {
                next(error);
            }
            /*
                {
                    '$metadata': {
                        httpStatusCode: 200,
                        requestId: 'eab1f0d9-3051-4404-85f1-fa5e8a8b2dd1',
                        extendedRequestId: undefined,
                        cfId: undefined,
                        attempts: 1,
                        totalRetryDelay: 0
                    },
                    AuthenticationResult: {
                        AccessToken: 'eyJraWQiOiJCNnBoUmkyRFwvK2ExckRsV21MXC92UmdBRjJNSVl2MnF0R3Q3VEFGVUVqcjg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl80THpBNER5dEwiLCJjbGllbnRfaWQiOiI2dWR0YjBodnY4b2EycjZiMGxrY2htMmhucSIsIm9yaWdpbl9qdGkiOiI4YTcxN2IxYy03YmY2LTQ1YWItOWMyYS01YmMxMTdkMjAyZGMiLCJldmVudF9pZCI6IjdiMjczODM5LTgwYmQtNDU4OS1iYmE3LWFmNjQ1YmI2MWM4OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NjAwNzUwMjksImV4cCI6MTY2MDA3ODYzNywiaWF0IjoxNjYwMDc1MDM3LCJqdGkiOiI1YzE0MjAyYy00MjUxLTRkODUtYTUzMC1iNzA1OGEzOTg4YmUiLCJ1c2VybmFtZSI6IjBiOWMwYjU4LWQ2OGYtNDZmZC04NTk1LTYxMmFjODBhZjJlZiJ9.TW8Hj86jzjeXEB4SpBZGzvjrHek3xqohTidWIi5baLkTNeBhSpFETL8YpN7DslK-0JsovFs3-Gm-zkzMbMrmhO1_ElOiXtsrcvqjcbya9nia7cIhbionbYhv3Tnq-9_r4ZWD-0qPNF5skiYii579sDIfR6QoTk2GgqZOSW4YCFQ9RmIrmXGLglRF88V-eJUDVUYCOPfQa8RcaMk1MfqWoN4eOP_NPZPd1TEMs3oobP06aXQ7H7n7rH9mTZ9htxwDvtcwCMvq-PxTTO8QdpcYb9DiJY2WWLiHE7vQXJsvNDcvkxxbQ87gJiq7DTBdiR9C4sFyAGuOF4VUJWe2AUDOfA',
                        ExpiresIn: 3600,
                        IdToken: 'eyJraWQiOiI1VktYcGlId2FsSTZiMHhaMEFWcmhLd25HVG5KTHkzeFNhODJpbmVEVDZ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzRMekE0RHl0TCIsImNvZ25pdG86dXNlcm5hbWUiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJvcmlnaW5fanRpIjoiOGE3MTdiMWMtN2JmNi00NWFiLTljMmEtNWJjMTE3ZDIwMmRjIiwiYXVkIjoiNnVkdGIwaHZ2OG9hMnI2YjBsa2NobTJobnEiLCJldmVudF9pZCI6IjdiMjczODM5LTgwYmQtNDU4OS1iYmE3LWFmNjQ1YmI2MWM4OSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYwMDc1MDI5LCJleHAiOjE2NjAwNzg2MzcsImN1c3RvbTpyb2xlIjoidmVuZG9yIiwiaWF0IjoxNjYwMDc1MDM3LCJqdGkiOiJlMTU2NmU0Ny05M2ZlLTRkOWYtYTQwMi05ZGU1ODNmZjljZTQiLCJlbWFpbCI6Imxha3NoYW5wZXJlcmEuZGV2QGdtYWlsLmNvbSJ9.RAtmkZq3Qnd2GMt7o9aDJrjIxRtUvsf9ZRQ_lwwxPoCKgbQ-TrM83D1Vs-e8dKQTPA0q-A4O4S9XdMndTUFFqtCsvPXznPSTkhofA9JNpHqFFVzbxy9FnepMh8dgD2D8aN9JALq4sFnuw0eOwxLqwqjgEMT3e5ED-TYM0x1h5TqCBBnCo-EgbfBByP3Y35zjMjn6q3E4voQbXKcDQ3dGy3jVDNvwD82lfeDFV7DsUfEKKKzai9MAvkqfnAKHHreiqxbLcyKWMpt7hbJJq1GKUfE4-nOqHruUziH9lAjmR0T3EtG18AE3ck1t-UaFFnyfsFPX_MCIi7Zt7WpPgJin7A',
                        NewDeviceMetadata: undefined,
                        RefreshToken: undefined,
                        TokenType: 'Bearer'
                    },
                    ChallengeName: undefined,
                    ChallengeParameters: {},
                    Session: undefined
                }
            */ 
        }

        console.log(error);
        next(error);
    }
}


/**
 * @desc update user attributes
 * @path PUT /api/v1/auth/user
 * @authorization Private
 * */
const updateUserAttributes = async (req, res, next) => {
    try {

        const { _id: userId } = req.user;

        // validate user input
        const userSchema = yup.object().shape({
            firstName: yup.string('firstName must be a string')
                            .max(127, 'firstName is too long'),
            lastName: yup.string('lastName must be a string')
                            .max(127, 'lastName is too long'),
            language: yup.string('language must be a string')
                            .max(127, 'language is too long'),
            country: yup.string('country must be a string')
                        .max(127, 'country is too long'),
            defaultAccount: yup.string('defaultAccount must be a string')
                        .max(127, 'defaultAccount is too long')
        });

        const validated = await userSchema.validate(req.body);
        const response = await authService.updateUserAttributes(userId, validated);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc clear cookies and logout the user
 * @path GET /api/v1/auth/logout
 * @authorization Private
 * */ 
 const logout = async (req, res, next) => {
    try {

        const { _id: userId } = req.user;

        console.log(userId, 'logged out');

        res.clearCookie('AccessToken');
        res.clearCookie('IdToken');
        res.clearCookie('RefreshToken');

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    logout,
    signUp,
    signIn,
    verifyAuth,
    getUserAttributesBySubId,
    updateUserAttributes
}