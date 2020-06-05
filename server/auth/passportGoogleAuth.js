const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config");

passport.use(new GoogleStrategy(
    {
        clientID: config.googleAuth.clientId,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("test", profile);

        const { emails, name } = profile;
        const { givenName, familyName } = name;
        const email = emails[0].value;

        const [user, created] = await User.findOrCreate({
            where: {
                email
            },
            defaults: {
                firstName: givenName,
                lastName: familyName
            }
        });

        return done(null, user);
    }
));
