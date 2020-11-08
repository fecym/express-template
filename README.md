## 技术栈

框架: express

数据库 ORM: sequelize、mysql2

依赖注入: awilix

路由插件: awilix-express

## 配置 babel

因为 awilix 和 awilix-express 会用到 ES6 的 class 和 decorator 语法，所以需要 @babel/plugin-proposal-class-properties 和 @babel/plugin-proposal-decorators 转换一下

`npm i @babel/core @babel/cli @babel/preset-env @babel/node @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators`

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
    ]
  ]
}
```

## 数据库

model 层，定义业务相关的数据模型

## DAO 和 Service

## 依赖注入 DI

依赖注入（DI）最大的作用是帮我们创建我们所需要是实例，而不需要我们手动创建，而且实例创建的依赖我们也不需要关心，全都由 DI 帮我们管理，可以降低我们代码之间的耦合性。
