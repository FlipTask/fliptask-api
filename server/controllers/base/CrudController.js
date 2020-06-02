const Response = require("./Response");

class CrudController {
  constructor(service) {
    this.service = service;
  }

  list = async (req, res, next) => {
    try {
      const data = await this.service.list(req.query);
      Response.success(res, data);
    } catch (error) {
      Response.error(res, error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      Response.success(res, data, 201);
    } catch (error) {
      Response.error(res, error);
    }
  };

  get = async (req, res, next) => {
    try {
      const data = await this.service.get(req.params.id, req.query);
      Response.success(res, data);
    } catch (error) {
      Response.error(res, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.service.update(req.params.id, req.body);
      Response.success(res, data);
    } catch (error) {
      Response.error(res, error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = res.send(await this.service.delete(req.params.id));
      Response.success(res, data);
    } catch (error) {
      Response.error(res, error);
    }
  };
}

module.exports = CrudController;
