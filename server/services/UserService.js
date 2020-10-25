const CrudService = require("./base/CrudService");
const MailerService = require("./../metaServices/MailerService");
const crypto = require("crypto");
const bcrypt = require("bcrypt");


class UserService extends CrudService {
    SALT_WORK_FACTOR = 10;
    TOKEN_EXPIRY_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;

    _getPasswordHash = async (password) => {
        const salt = bcrypt.genSaltSync(this.SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(password, salt);
        return hash
    }

    _checkPassword = async (candidate, saved) => {
        return await bcrypt.compare(candidate, saved);
    }

    _createAuthToken = async (user) => {
        const token = crypto.randomBytes(20).toString('hex');
        const expiresAt = new Date(new Date().getTime() + this.TOKEN_EXPIRY_MILLISECONDS);

        const authToken = await AuthToken.create({
            token,
            expiresAt,
            userId: user.id
        });

        await authToken.setUser(user);

        return token;
    }

    _deleteToken = async (token) => {
        const authToken = await AuthToken.findOne({
            where: {
                token
            }
        });

        await authToken.destroy();
    }

    create = async (data) => {
        const { firstName, lastName, email, password } = data;
        try {
            const user = await User.create({ firstName, lastName, email });
            user.password = await this._getPasswordHash(password);
            user.save();
            await this.sendEmailVerificationLink(user);
            // send email here
            return {
                message: "Signed up successfully!"
            }
        } catch (error) {
            console.log("Create error", error);
            throw error;
        }
    }

    sendEmailVerificationLink = async(user) => {
        try {
            // check if already sent
            const verificationHistory = await Verification.findOne({
                where: {
                    contact: user.email
                }
            });
            if(!verificationHistory) {
                const hash = await Hash.createEmailVerificationHash(user.email);
                await Verification.create({
                    isEmail: true,
                    contact: user.email,
                    link: hash
                });
                MailerService.sendVerification(user.email, hash);
                return {
                    message: "Mail sent successfully!"
                };
            }

            const updatedAtTimeStamp = new Date(verificationHistory.dataValues.updatedAt);
            const minTime = 30 * 60 * 1000; // 30min
            const maxTime = 12 * 60 * 60 * 1000; //12 hours

            /**
             *  If tried to resend in less than 30 min
            */
            if(Date.now() - updatedAtTimeStamp <= minTime) {
                return {
                    message: "Mail already sent, Please try again after "+ Math.ceil((minTime - (Date.now() - updatedAtTimeStamp))/60000) +" min(s)"
                };
            }

            /**
             *  if time is more than 30 min but less or equal to 12 hours
            */
            if( Date.now() - updatedAtTimeStamp >= minTime && (Date.now() - updatedAtTimeStamp) <= maxTime) { 
                const hash = await Hash.createEmailVerificationHash(user.email);
                await Verification.update(verificationHistory.id, {
                    link: hash
                });
                MailerService.sendVerification(user.email, hash);
                return {
                    message: "Mail re-sent successfully"
                }
            }

            /**
             *  when the link is expired
            */
            await Verification.destroy({
                where: {
                    id: verificationHistory.id
                }
            });
            return this.sendEmailVerificationLink(user);
        } catch(error) {
            // console.log(error);
            throw new FliptaskError("Failed to send verification email");
        }
    }

    login = async (data) => {
        const { email, password } = data;

        const user = await User.scope('withPassword').findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new FliptaskError("No user exists with this email!")
        }

        const passwordMatch = await this._checkPassword(password, user.password);
        if (!passwordMatch) {
            throw new FliptaskError("Invalid credentials!")
        }

        if(!user.dataValues.isEmailVerified) {
            throw new FliptaskError({
                statusCode: 403,
                message: "Email is not verified",
                next: "send_verification_email"
            })
        }
        return await this.token(user);
    }

    token = async (user) => {
        const token = await this._createAuthToken(user);
        return {
            token
        };
    }

    logout = async (req) => {
        const authHeader = req.get("Authorization");

        const splitHeader = authHeader.split(" ")

        if (splitHeader.length != 2) {
            throw new FliptaskError("Failed to logout!");
        }

        const token = splitHeader[1];
        try {
            await this._deleteToken(token);
            return {
                message: "Logged out!"
            }
        } catch (error) {
            throw new FliptaskError("Failed to logout!")
        }
    }

    verifyEmail = async(token) => {
        try {
            const decryptedData = await Hash.decrypt(token);
            const userInfo = decryptedData;
            const user = await User.findOne({
                where: {
                    email: userInfo.email
                }
            });
            //TODO: this logic needs to be fixed
            await Verification.destroy({
                where: {
                    isEmail: true,
                    contact: userInfo.email
                }
            });
            if(user.dataValues && Date.now() <= userInfo.ttl && !user.dataValues.isEmailVerified) {
                const new_user = await this.update(user.dataValues.id, {
                    isEmailVerified: true
                });
                return {
                    message: "Email verification successfull"
                }
            }else {
                throw new FliptaskError("Link is broken or expired!");
            }
        } catch (error) {
            console.log(error);
            throw new FliptaskError("Link is broken or expired!");
        }
    }

    resendEmailVerificationLink = async(email) => {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if(!user) {
                throw new FliptaskError("No user found with this mail");
            }

            if(user.dataValues.isEmailVerified) {
                throw new FliptaskError("This email is already verified");
            }

            return this.sendEmailVerificationLink(user.dataValues);
            
        } catch (error) {
            // console.log(error);
            throw new FliptaskError(error.message || "Failed to resend verification email");
        }
    }
}

global.UserService = new UserService(User);
