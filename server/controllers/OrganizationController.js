export default {
    create: async(req, res, next) => {
        try{
            const {
                name
            } = req.body;
            const createdBy = req.user._id
            const org = await Organization.findOne({createdBy});
            if(!org){
                const newOrg = await Organization.create({name,createdBy});
                const populatedOrg = await newOrg.populate("meta").execPopulate();
                return res.status(200).send({
                    error: false,
                    data: populatedOrg,
                    message: "OK"
                });
            }
            return res.status(409).send({
                error: true,
                data: null,
                message: `You already have a organization with name ${org.name}`
            });

        }catch(e){
            Logger.error(`[ERROR] Error in creating Org ${e}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    get: async(req,res,next) => {
        try{
            const {orgId} = req.params;
            const createdBy = req.user._id;
            
            const org = await Organization.findOne({createdBy,_id: orgId});
            if(org){
                return res.status(200).send({
                    error: false,
                    data: org,
                    message: "OK"
                });
            }
            return res.status(400).send({
                error: true,
                data: null,
                message: `Incorrect info`
            });
        }catch(e){
            Logger.error(`[ERROR] Error in finding Org ${e}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    search: async(req,res,next) => {
        try{
            const {
                q
            } = req.query;
            if(q){
                const orgNameRegex = new RegExp("^"+q, 'i')
                const orgs = await Organization.find({name: orgNameRegex},"name _id").limit(10);
                
                return res.status(200).send({
                    error: false,
                    data: orgs,
                    message: "OK"
                });
            }else{
                return res.status(200).send({
                    error: false,
                    data: [],
                    message: `search string should not be empty`
                });
            }
        }catch(e){
            Logger.error(`[ERROR] Error in Searching Org ${e}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    }
}