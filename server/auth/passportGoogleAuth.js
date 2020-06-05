const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config");

passport.use(new GoogleStrategy(
    {
        clientID: config.googleAuth.clientId,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackUrl
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log("test", profile);
    }
));
