const interfaces = require('os').networkInterfaces();
export default function () {
  let IpAddress = '';
  for (let devName in interfaces) {
    interfaces[devName].forEach(ip => {
      if (ip.family === 'IPv4' && ip.address !== '127.0.0.1' && !ip.internal) {
        IpAddress = ip.address;
      }
    });
  }
  return IpAddress;
}
