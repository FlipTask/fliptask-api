const nodemailer = require("nodemailer");

const init = () => {
    try {
        const { env } = process;
        return nodemailer.createTransport({
            service: env.MAILER_SERVICE_NAME,
            pool: true,
            host: "smtp.sendgrid.net",
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
