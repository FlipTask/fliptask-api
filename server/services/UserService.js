const CrudService = require("./base/CrudService");
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
            user
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
            return {
                message: "Signed up successfully!"
            }
        } catch (error) {
            console.log("Create error", error);
            throw error;
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
            throw "No user exists with this email!"
        }

        const passwordMatch = await this._checkPassword(password, user.password);
        if (!passwordMatch) {
            throw "Invalid credentials!"
        }

        const token = await this._createAuthToken(user);
        return {
            token
        };
    }

    logout = async (req) => {
        const authHeader = req.get("Authorization");

        const splitHeader = authHeader.split(" ")

        if (splitHeader.length != 2) {
            throw "Failed to logout!";
        }

        const token = splitHeader[1];
        try {
            await this._deleteToken(token);
            return {
                message: "Logged out!"
            }
        } catch (error) {
            console.log("Logout error", authHeader, error)
            throw "Failed to logout!"
        }
    }
}

global.UserService = new UserService(User);
