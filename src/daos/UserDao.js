import BaseDao from './base';

import { getPageSql, getUpdateSql, getFindSql, getFuzzySql } from '@/utils/sql';

export default class UserDao extends BaseDao {
  modelName = 'User';

  async createUser(item) {
    return await this.insert(item);
  }
  async updateUserById(id, userInfo, primaryKey = 'id') {
    const { params, query } = getUpdateSql(primaryKey, { ...userInfo, id });
    return await this.update(params, query);
  }
  async deleteUser(params) {
    const query = getFindSql(params);
    return await this.delete(query);
  }
  async restoreUser(params) {
    const query = getFindSql(params);
    return await this.restore(query);
  }
  async getUserInfo(params = {}) {
    const query = getFindSql(params);
    return await this.findOne(query, ['password']);
  }
  async getList(params = {}) {
    const query = getFuzzySql(Object.keys(params), params);
    return await this.findAll(query, ['password']);
  }
  async getPage(params = {}) {
    const pageParams = getPageSql(params);
    return await this.findAndCountAll(pageParams, ['password']);
  }
}
