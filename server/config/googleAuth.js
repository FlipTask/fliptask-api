module.exports = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: `${process.env.HOST}${process.env.GOOGLE_CALLBACK_URL}`
};
