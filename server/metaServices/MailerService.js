const InvitationTemplate = require("../mailTemplates/invitation");
const EmailVerificationTemplate = require("../mailTemplates/verify");
module.exports = {
    sendInvitation: async (to) => {
        const invitationLink = `${process.env.HOST_URL}/join?u=${from._id}&env=${to}&org=${from.meta.organization}`;
        const invitationTemplate = await InvitationTemplate(from, invitationLink);
        Mailer.sendMail({
            from: process.env.MAILER_SENDER_EMAIL,
            to,
            subject: "Invitation to join FlipTask",
            html: invitationTemplate
        }, (err, info) => {
            if (err) {
                console.log(err);
                Logger.error(err);
            } else {
                Logger.info(`Message sent: ${info.response}`);
            }
        });
    },
    sendVerification: async (to, token = "akkadbakkad") => {
        const verificationLink = `${process.env.HOST_URL}/verify-email?hash=${token}&redirect=/login`;
        const verificationEmailTemplate = await EmailVerificationTemplate(verificationLink)
        Mailer.sendMail({
            from: process.env.MAILER_SENDER_EMAIL,
            to,
            subject: "Verify your email",
            html: verificationEmailTemplate
        }, (err, info) => {
            if (err) {
                console.log(err);
                Logger.error(err);
            } else {
                Logger.info(`Message sent: ${info.response}`);
            }
        })
    }
};
