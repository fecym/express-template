import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const SALT = `salt-fecym`;

export function promiseCatch(promise) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      return [err];
    });
}

/**
 * 格式化时间
 * @param {*} date
 * @param format
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

/**
 * 处理响应信息
 * @param {*} success
 * @param {*} data
 * @param {*} message
 * @param res
 * @param isUpdate
 */
export function processResponse({ success, data, message, res, status }) {
  if (success) {
    return res.success({ data, status, message });
  } else {
    return res.fail({ error: data, message, status });
  }
}

/**
 * @description {下划线转换驼峰}
 * @param {要转换的下划线格式名字} name
 */
export function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
/**
 * @description {驼峰转换下划线}
 * @param {要转换的驼峰格式名字} name
 */
export function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function formatResponseData(obj) {
  if (!isObject) return obj;
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'create_time' || key === 'update_time') {
      value = formatDate(value);
    }
    result[toHump(key)] = value;
  });
  return result;
}

export function isUndefined(val) {
  return val === undefined || val === '';
}

export function isDate(str) {
  return typeof str !== 'number' && str !== null && new Date(str) !== 'Invalid Date';
}

export function isValidURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @description {判断对象是否是空对象}
 * @param {要判断的对象} object
 */
export function isEmptyObject(object) {
  return Object.keys(object).length === 0;
}

/**
 *
 * @param data
 * @returns {undefined|*}
 */
export function signToken(data) {
  return jwt.sign({ data }, SALT, {
    // 过期时间设置为1天，可使用秒或表示时间跨度 zeit / ms 的字符串表示。
    expiresIn: '1d'
  });
}

export function verifyToken(token, isBearer = true) {
  if (!token) return false;
  // 不要Bearer和空格，处理下token
  if (isBearer) {
    token = token.slice(7);
  }
  let res = {};
  try {
    // 校验 token 会得到一个对象，其中 iat 是 token 创建时间，exp 是 token 到期时间
    const { exp, data } = jwt.verify(token, SALT) || {};
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime <= exp) {
      res = data || {};
      return [null, res];
    }
    return ['token已过期', null];
  } catch (err) {
    return [err, null];
  }
}

/**
 * 字符转md5
 * @param code
 * @returns {string}
 */
export function toMd5(code) {
  return crypto.createHash('md5').update(code).digest('hex');
}
