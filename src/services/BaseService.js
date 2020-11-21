export default class BaseService {
  success(message, data = null, status = 200) {
    return {
      success: true,
      message,
      data,
      status
    };
  }
  fail(message, data = null, status = 500) {
    return {
      success: false,
      message,
      data,
      status
    };
  }
}
