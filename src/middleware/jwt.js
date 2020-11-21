import { formatDate, verifyToken } from '@/utils';

const WHITE_LIST = ['/api/user/login'];
export default (req, res, next) => {
  const currentUrl = req.url;
  console.log(currentUrl);
  if (
    WHITE_LIST.some((white) => white.indexOf(currentUrl) !== -1) ||
    currentUrl.indexOf('.html') !== -1
  ) {
    return next();
  } else {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return res.json({
        error: null,
        message: '未捕获到您的token',
        data: null,
        status: 403,
        success: false,
        timestamp: formatDate(new Date())
      });
    }
    const [error, result] = verifyToken(authorization);
    if (error) {
      return res.json({
        error,
        message: 'token校验失败',
        data: null,
        status: 401,
        success: false,
        timestamp: formatDate(new Date())
      });
    }
    // 向后传递消息
    req.loginInfo = result;
    return next();
  }
};
