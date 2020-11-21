import { formatResponseData, promiseCatch } from '@/utils/index';
import db from '../models';

export default class BaseDao {
  constructor(modules) {
    const request = modules.request;
    this.transaction = request.transaction;
    this.sequelize = db.sequelize;
  }

  // 插入数据
  insert(params) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync({ alter: true }).then(async () => {
        return Model.create(params, config).then((models) => {
          if (models.dataValues) {
            return formatResponseData(models.dataValues);
          }
          return null;
        });
      })
    );
  }

  batchInsert(params) {
    const Model = this.getConfig();
    const config = this.getConfig();
    return promiseCatch(Model.bulkCreate(params, config));
  }

  // 删除数据
  delete(params) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(async () => {
        return await Model.destroy({
          ...config,
          ...params
        });
      })
    );
  }

  // 恢复数据
  restore(params) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(() => {
        return Model.restore({
          ...config,
          ...params
        });
      })
    );
  }

  // 查找某个元素
  findOne(params, excludeKeys = []) {
    const Model = this.getModel();
    return promiseCatch(
      Model.findOne({
        ...params,
        attributes: { exclude: excludeKeys.concat('deleted_time') }
      }).then((models) => {
        if (models && models.dataValues) {
          return formatResponseData(models.dataValues);
        }
        return models;
      })
    );
  }

  // 查找所有数据
  findAll(params, excludeKeys = []) {
    const Model = this.getModel();
    return promiseCatch(
      Model.findAll({
        ...params,
        attributes: { exclude: excludeKeys.concat('deleted_time') }
      }).then((models) => {
        if (models.length) {
          return models.map((model) => formatResponseData(model.dataValues));
        }
        return [];
      })
    );
  }

  // 在数据库中搜索多个元素, 返回数据和总计数
  findAndCountAll(params, excludeKeys = []) {
    const Model = this.getModel();
    return promiseCatch(
      Model.findAndCountAll({
        ...params,
        attributes: { exclude: excludeKeys.concat('deleted_time') }
      }).then((models) => {
        const { count, rows } = models;
        if (rows.length) {
          return {
            total: count,
            count,
            rows: rows.map((model) => formatResponseData(model.dataValues))
          };
        }
        return models;
      })
    );
  }

  // 更新数据
  update(params, query) {
    const Model = this.getModel();
    const config = this.getConfig();
    return promiseCatch(
      Model.sync().then(() => {
        return Model.update(params, {
          ...config,
          ...query
        });
      })
    );
  }

  getModel() {
    return db[this.modelName];
  }

  getConfig() {
    const config = {};
    if (this.transaction) {
      config.transaction = this.transaction;
    }
    return config;
  }

  commit() {
    if (this.transaction) {
      return promiseCatch(this.transaction.commit());
    }
    return promiseCatch(Promise.resolve());
  }

  rollback() {
    if (this.transaction) {
      return promiseCatch(this.transaction.rollback());
    }
    return promiseCatch(Promise.resolve());
  }
}
