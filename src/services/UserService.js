import BaseService from './BaseService';
import { signToken, toMd5, verifyToken } from '@/utils';

/**
 * service 处理业务
 */
export default class UserService extends BaseService {
  constructor({ userDao }) {
    super();
    this.userDao = userDao;
  }

  async getPage({ page = 1, size = 10, ...params }) {
    const [err, { total, rows: list }] = await this.userDao.getPage({ page, size, ...params });
    if (err) {
      return this.fail('获取列表失败', err);
    }
    return this.success('获取列表成功', { total, page, size, list });
  }

  async getList(params) {
    const [err, data] = await this.userDao.getList(params);
    if (err) {
      return this.fail('获取列表失败', err);
    }
    return this.success('获取列表成功', data || []);
  }

  // 添加
  async createUser({ name, loginName, password, ...params }) {
    if (!name || !loginName || !password) {
      return this.fail('失败', '参数异常', 400);
    }
    password = toMd5(password);
    delete params.id;
    const [err, data] = await this.userDao.createUser({ name, loginName, password, ...params });
    if (err) {
      return this.fail('失败', err);
    }
    return this.success('成功', data);
  }

  async updateUserById(id, userInfo) {
    const password = userInfo.password;
    if (password) {
      userInfo.password = toMd5(password);
    }
    delete userInfo.id;
    const [err, data] = await this.userDao.updateUserById(id, userInfo);
    if (err) {
      return this.fail('失败', err);
    }
    if (data[0] >= 1) {
      return this.success('成功', id);
    } else {
      return this.success('更新失败', id);
    }
  }

  // 删除
  async deleteUser(params) {
    const [err] = await this.userDao.deleteUser(params);
    if (err) {
      return this.fail('删除失败', err);
    }
    return this.success('删除成功', null);
  }

  async restoreUser(params) {
    const [err] = await this.userDao.restoreUser(params);
    if (err) {
      return this.fail('恢复失败', err);
    }
    return this.success('恢复成功', null);
  }

  async login({ username, password }) {
    if (!username || !password) {
      return this.fail('登陆失败', '请输入用户名或密码', 200);
    }
    password = toMd5(password);
    const [err, data] = await this.userDao.getUserInfo({ loginName: username, password });
    if (err) {
      return this.fail('登陆失败', err, 500);
    }
    if (data) {
      console.log(data);
      delete data.createTime;
      delete data.updateTime;
      if (data.id) {
        data.token = signToken(data);
        return this.success('登陆成功', data, 200);
      }
    }
    return this.fail('登陆失败', '用户名或密码错误', 200);
  }

  // 详情
  async getUserInfo(params) {
    const [err, data] = await this.userDao.getUserInfo(params);
    if (err) {
      return this.fail('查询失败', err);
    }
    return this.success('查询成功', data || {});
  }

  verifyToken(token) {
    const [err, data] = verifyToken(token);
    if (err) {
      return this.fail('token校验失败', err, 401);
    }
    return this.success('查询成功', data || {});
  }
}
