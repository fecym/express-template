import { formatDate } from '@/utils';
import { asValue } from 'awilix';

export function baseMiddleware(app) {
  return (req, res, next) => {
    res.success = ({ data, error = null, message = '成功', status = 200 }) => {
      res.json({
        error,
        message,
        data,
        status,
        success: true,
        timestamp: formatDate(new Date())
      });
    };
    res.fail = ({ data, error = null, message = '失败', status = 500 }) => {
      res.json({
        error,
        message,
        data,
        status,
        success: false,
        timestamp: formatDate(new Date())
      });
    };

    req.app = app;
    req.container = req.container.createScope();
    req.container.register({
      request: asValue(req),
      response: asValue(res)
    });
    next();
  };
}
