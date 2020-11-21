## 技术栈

框架: express

数据库 ORM: sequelize、mysql2

依赖注入: awilix

路由插件: awilix-express

## 配置 babel

因为 awilix 和 awilix-express 会用到 ES6 的 class 和 decorator 语法，所以需要 @babel/plugin-proposal-class-properties 和 @babel/plugin-proposal-decorators 转换一下

```sh
npm i @babel/core @babel/cli @babel/preset-env @babel/node @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

前端开发项目中习惯了，使用 `@` 符号代替 `src` 目录，babel 配置 `module-resolver` 也可以实现

```sh
npm install --save-dev babel-plugin-module-resolver
```

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false,
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "@": "./src"
        }
      }
    ]
  ]
}
```

## env

前端开发中习惯使用 `env` 文件控制项目的配置文件，node 中我们使用 `env2` 依赖包来处理

```js
const env2 = require('env2');
if (process.env.NODE_ENV === 'production') {
  // 这里只写 env 文件名，无需写绝对路径
  env2('.env.prod');
} else {
  env2('.env');
}
const { env } = process;
module.exports = {
  development: {
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql'
  },
  production: {
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql'
  }
};
```

## 数据库

使用 sequelize 来定义业务相关的数据模型（model层）

## DAO 和 Service

## 依赖注入 DI

依赖注入（DI）最大的作用是帮我们创建我们所需要是实例，而不需要我们手动创建，而且实例创建的依赖我们也不需要关心，全都由 DI 帮我们管理，可以降低我们代码之间的耦合性。
