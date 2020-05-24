class CrudController {
    PAGE_SIZE = 10
    LIMIT = 10

    constructor(model) {
        this.model = model;
    }

    create = async (req, res) => {
        const data = await this.model.create(req.body);
        return res.send({
            data
        });
    }

    list = async (req, res) => {
        try {
            const sort_by_string = req.query.sort_by;
            delete req.query.sort_by;

            const limit = req.query.limit || this.LIMIT;
            delete req.query.limit;

            const page = parseInt(req.query.page) || 1;
            delete req.query.page;

            const skip = (page - 1) * this.PAGE_SIZE;

            for (let [key, value] of Object.entries(req.query)) {
                req.query[key] = Mongoose.Types.ObjectId.isValid(value)
                    ? Mongoose.Types.ObjectId(value)
                    : value;
            }

            const sort_by = sort_by_string.split(' ').reduce((acc, item) => {
                if (item.charAt(0) == '-') {
                    acc[item.slice(1, item.length)] = -1
                } else {
                    acc[item] = 1
                }
                return acc;
            }, {})

            console.log(sort_by);

            const result = await this.model.aggregate([{
                $facet: {
                    data: [
                        { $match: req.query },
                        { $skip: skip },
                        { $limit: limit },
                        { $sort: sort_by }
                    ],
                    totalCount: [
                        { $match: req.query },
                        { $count: 'count' }
                    ]
                }
            }])

            const [{ data }] = result;
            let [{ totalCount }] = result;
            let [{ count }] = totalCount;

            console.log(totalCount, count);

            return res.send({
                page_size:this.PAGE_SIZE,
                count,
                page,
                data,
                count
            });
        } catch (error) {
            return res.status(500).send({
                'error': error.message
            });
        }
    }

    get = async (req, res) => {
        const id = req.params.id;
        const data = await this.model.findById(id);
        return res.send({
            error: false,
            data,
            message: "OK"
        });
    }

    update = async (req, res) => {
        try {
            const id = req.params.id;
            const new_data = req.body;
            await this.model.findByIdAndUpdate(id, new_data);
            const data = await this.model.findById(id);
            return res.send({
                data
            });
        } catch (error) {
            return res.status(500).send({
                'error': error.message
            });
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id;
            let data = await this.model.findByIdAndRemove(id);
            return res.send({
                data
            })
        } catch (error) {
            return res.status(500).send({
                'error': error.message
            });
        }
    }
}

module.exports = CrudController;
