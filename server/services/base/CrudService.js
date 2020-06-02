class CrudService {
  constructor(model) {
    this.model = model;
    this.pageSize = 2;
  }

  list = async (query) => {
    let { limit, sort_by, page, include, ...where } = query;
    limit = parseInt(limit) || this.pageSize;
    page = parseInt(page) || 1;

    if (include) include = include.split(" ");

    let order = null;
    if (sort_by) {
      order = sort_by.split(" ").reduce((acc, item) => {
        if (item.charAt(0) == "-") {
          acc = [...acc, [item.slice(1), "DESC"]];
        } else {
          acc = [...acc, [item]];
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
      include,
    });

    const { rows, count } = result;

    return { rows, count, page, page_size: this.pageSize, limit };
  };

  create = async (data) => {
    return await this.model.create(data);
  };

  get = async (id, query) => {
    let { include } = query;
    return await this.model.findByPk(id, { include });
  };

  update = async (id, data) => {
    return await this.model.update(data, { where: { id } });
  };

  delete = async (id) => {
    const instance = await this.model.findByPk(id);
    if (!instance) return { message: "Does not exist!" };
    return instance.destroy();
  };
}

module.exports = CrudService;
