const passport = require("passport");

global.passport = passport;

require("./passportHttpBearer");
require("./passportGoogleAuth");

global.bearerAuth = passport.authenticate("bearer", { session: false });
global.googleAuth = passport.authenticate("google", { scope: ["profile"] });
