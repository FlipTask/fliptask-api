const jwt = require("jsonwebtoken");

module.exports = {
    authenticate: async(req,res,next) => {
        try {
            let token;
            if(req.cookies.token){
                token = req.cookies.token
            }else{
                token = req.header('Authorization').replace('Bearer ', '')
            } 
            
            const data = jwt.verify(token, process.env.JWT_KEY)
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ 
                error: true,
                data: null,
                message: 'Not authorized to access this resource' 
            });
        }
    }
}