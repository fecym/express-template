import bodyParser from 'body-parser';
import { route, POST, GET, before } from 'awilix-express';
import { processResponse } from '@/utils';

@route('/user')
export default class UserAPI {
  constructor({ userService }) {
    this.userService = userService;
  }

  @route('/login')
  @POST()
  async login(req, res) {
    try {
      const { success, data, message, status } = await this.userService.login(req.body);
      processResponse({ success, data, message, status, res });
    } catch (e) {
      console.log(e);
    }
  }

  @route('/verify')
  @GET()
  async verify(req, res) {
    try {
      const code =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoi5by65ZOlIiwibG9naW5OYW1lIjoibXpxIiwicm9sZSI6IjAiLCJhdmF0YXIiOm51bGx9LCJpYXQiOjE2MDU4NzU3NzUsImV4cCI6MTYwNTk2MjE3NX0.S1qTFAXYrhQHwmy0RRIC40h0VYKXxQ586ZdZEcK-OrQ';
      const { success, data, message, status } = await this.userService.verifyToken(code, false);
      processResponse({ success, data, message, status, res });
    } catch (e) {
      console.log(e);
    }
  }

  @route('/get/page')
  @GET()
  async getPage(req, res) {
    const { success, data, message, status } = await this.userService.getPage(req.query);
    processResponse({ success, data, message, status, res });
  }

  @route('/get/list')
  @GET()
  async getList(req, res) {
    const { success, data, message, status } = await this.userService.getList(req.query);
    processResponse({ success, data, message, status, res });
  }

  @route('/get/destroy')
  @GET()
  async getDestroyData(req, res) {
    const { success, data, message } = await this.userService.getDestroyData(req.query);
    processResponse({ success, data, message, status, res });
  }

  @route('/info/:id')
  @GET()
  async getUserInfo(req, res) {
    const { success, data, message, status } = await this.userService.getUserInfo(req.params);
    processResponse({ success, data, message, status, res });
  }

  @route('/add')
  @POST()
  @before([bodyParser.json()])
  async add(req, res) {
    const { success, data, message, status } = await this.userService.createUser(req.body);
    processResponse({ success, data, message, status, res });
  }

  @route('/update/:id')
  @POST()
  @before([bodyParser.json()])
  async update(req, res) {
    const {
      params: { id },
      body
    } = req;
    const { success, data, message, status } = await this.userService.updateUserById(id, body);
    processResponse({ success, data, message, status, res });
  }

  @route('/delete/:id')
  @POST()
  async delete(req, res) {
    const { success, message, status } = await this.userService.deleteUser(req.params);
    const data = req.params.id;
    processResponse({ success, data, message, status, res });
  }

  /**
   * 恢复删除的数据
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  @route('/restore/:id')
  @POST()
  @before([bodyParser.json()])
  async restore(req, res) {
    const { success, message } = await this.userService.restoreUser(req.params);
    const data = req.params.id;
    processResponse({ success, data, message, res });
  }
}
