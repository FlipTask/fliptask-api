const BearerStrategy = require("passport-http-bearer").Strategy;

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const authToken = await AuthToken.findOne(
        {where : {token, expiresAt : {[Sequelize.Op.gt] : Date.now()}}});
    done(null, await authToken.getUser());
  } catch (error) {
    done(null, null, {error : "Invalid session."});
  }
}));
