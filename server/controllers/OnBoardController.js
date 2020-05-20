module.exports = {
    invite: async(req,res,next) => {
        try{
            const {
                mailList=[]
            } = req.body;
            const meta = await UserMeta.findOne({user: req.user._id});
            req.user.meta = meta;
            mailList.forEach((value) => {
                MailerService.sendInvitation(req.user,value);
            });
            return res.status(200).send({
                error: false,
                message: "Invitation sent"
            });   
        }catch(err){
            console.log(err);
            Logger.error(err);
            return res.status(500).send({
                error: true,
                message: "Something went wrong !"
            });
        }
    }
}