const passport = require("passport");

global.passport = passport;

require("./passportHttpBearer");

global.bearerAuth = passport.authenticate("bearer", {session : false});
