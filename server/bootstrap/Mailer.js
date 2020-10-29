const nodemailer = require("nodemailer");

const init = () => {
    try {
        const { env } = process;
        return nodemailer.createTransport({
            pool: true,
            host: env.MAILER_HOST,
            port: 587,
            auth: {
                user: env.MAILER_USERNAME,
                pass: env.MAILER_PASSWORD
            }
        });
    } catch (e) {
        Logger.error(e);
        return e;
    }
};

module.exports = init;
