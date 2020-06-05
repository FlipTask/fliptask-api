const Permissions = require("./Permissions");

class CrudService extends Permissions {
    constructor(model) {
        super(model);
        this.model = model;
        this.pageSize = 2;
    }

    list = async (query) => {
        let { limit, sort_by, page, include, ...where } = query;
        limit = parseInt(limit) || this.pageSize;
        page = parseInt(page) || 1;

        if (include) include = include.split(' ');

        let order = null;
        if (sort_by) {
            order = sort_by.split(' ').reduce((acc, item) => {
                if (item.charAt(0) == '-') {
                    acc = [...acc, [item.slice(1), "DESC"]]
                } else {
                    acc = [...acc, [item]]
                }
                return acc;
            }, []);
        }

        const offset = (page - 1) * this.pageSize;

        const result = await this.model.findAndCountAll({
            where,
            offset,
            limit,
            order,
            include
        });

        const { rows, count } = result;

        return {
            rows,
            count,
            page,
            page_size: this.pageSize,
            limit
        };
    }

    beforeCreate = async (data) => { }

    create = async (data) => {
        await this.beforeCreate(data);
        const createResponse = await this.model.create(data);
        return await this.afterCreate({ data, createResponse });
    }

    afterCreate = async ({ data, createResponse }) => {
        return createResponse;
    }

    get = async (id, query) => {
        let { include } = query;
        return await this.model.findByPk(id, { include });
    }

    update = async (id, data) => {
        return await this.model.updateOne(data, {
            where: {
                id
            }
        });
    }

    delete = async (id) => {
        const instance = await this.model.findByPk(id);
        if (!instance) return { message: "Does not exist!" };
        return instance.destroy();
    }
}

module.exports = CrudService;
