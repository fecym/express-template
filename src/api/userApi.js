import bodyParser from 'body-parser';
import { route, POST, before } from 'awilix-express';

@route('/user')
export default class UserAPI {
  constructor({ userService }) {
    this.userService = userService;
  }

  @route('/findPage')
  @POST()
  @before([bodyParser.json()])
  async findPage(req, res) {
    // console.log("findPage -> req, res", req, res)
    const { success, data, message } = await this.userService.findPage(req.body);
    if (success) {
      return res.success(data);
    } else {
      res.fail(null, message);
    }
  }

  @route('/findItem')
  @POST()
  @before([bodyParser.json()])
  async findItemById(req, res) {
    const { success, data, message } = await this.userService.findItem(req.body);
    if (success) {
      return res.success(data);
    } else {
      res.fail(null, message);
    }
  }

  @route('/add')
  @POST()
  @before([bodyParser.json()])
  async add(req, res) {
    const { success, data, message } = await this.userService.addItem(req.body);
    console.log('add -> success, data, message', success, data, message);
    if (success) {
      return res.success(data.id);
    } else {
      res.fail(null, message);
    }
  }

  @route('/delete')
  @POST()
  @before([bodyParser.json()])
  async delete(req, res) {
    const { success, message } = await this.userService.deleteItem(req.body);
    if (success) {
      return res.success(null);
    } else {
      res.fail(null, message);
    }
  }
}
