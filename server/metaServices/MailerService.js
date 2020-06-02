const Invitation = require("../mailTemplates/invitation");

module.exports = {
  sendInvitation: async (from, to) => {
    const invitationLink = `${process.env.HOST_URL}/join?u=${from._id}&env=${to}&org=${from.meta.organization}`;
    const invitationTemplate = await Invitation(from, invitationLink);
    Mailer.sendMail(
      {
        from: process.env.MAILER_SENDER_EMAIL,
        to,
        subject: "Invitation to join FlipTask",
        html: invitationTemplate,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          Logger.error(err);
        } else {
          Logger.info(`Message sent: ${info.response}`);
        }
      }
    );
  },
};
