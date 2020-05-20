module.exports = {
    create: async (req, res) => {
        const {
            email,
            first_name: firstName,
            last_name: lastName,
            password,
            organization
        } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(409).send({
                    error: false,
                    data: null,
                    message: "User already exist."
                });
            }
            const newUser = await User.create({
                email,
                first_name: firstName,
                last_name: lastName,
                password
            });
            const populatedUser = await newUser.populate([{
                path: "meta"
            }
            ]).execPopulate();
            const token = await newUser.generateAuthToken();

            const org = await Organization.findOne({ name: organization });
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).send({
                error: false,
                data: {
                    user: populatedUser,
                    token,
                    organization: org
                },
                message: "OK"
            });
        } catch (e) {
            Logger.error(`[ERROR] Error in creating user \n${e}`);
            console.log(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: e.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email && !password) {
                return res.status(400).send({
                    error: true,
                    data: null,
                    message: "Login failed! Check authentication credentials"
                });
            }
            const user = await User.findByCredentials(email, password);

            if (!user.user) {
                return res.status(401).send({
                    error: true,
                    data: null,
                    message: user.message
                });
            }
            const token = await user.user.generateAuthToken();
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).send({
                error: false,
                data: {
                    user: user.user,
                    token
                },
                message: "OK"
            });
        } catch (e) {
            Logger.error(`[ERROR] ${JSON.stringify(e)}`);
            console.log(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong !"
            });
        }
    },
    get: async (req, res) => {
        try {
            const user = await User.findById({
                _id: req.user._id
            }).populate({
                path: "meta",
                populate: ["organization", "team_list"]
            });
            return res.status(200).send({
                error: false,
                data: user,
                message: "OK"
            });
        } catch (e) {
            Logger.error(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong !"
            });
        }
    },
    getMeta: async (req, res) => {
        try {
            const user = req.user._id;
            const meta = await UserMeta.findOne({ user }).populate(["organization", "team_list"]);
            if (!meta) {
                return res.status(400).send({
                    error: true,
                    data: null,
                    message: "Invalid user"
                });
            }
            return res.status(200).send({
                error: false,
                data: meta,
                message: "OK"
            });
        } catch (e) {
            Logger.error(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong !"
            });
        }
    },
    logout: async (req, res) => {
        try {
            const user = await User.findById({
                _id: req.user._id
            });
            user.tokens = await user.tokens.filter((token) => token.token !== req.token);
            await user.save();
            return res.status(200).send({
                error: false,
                data: null,
                message: "User logged out"
            });
        } catch (e) {
            Logger.error(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong !"
            });
        }
    }
};
