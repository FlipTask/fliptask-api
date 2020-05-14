const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const init = () => {
    try {
        const env = process.env;
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
    } 
}

export default init;