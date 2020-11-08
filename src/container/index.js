/*
 * 创建 DI 容器 依赖注入，连接 dao 与 service
 */
import { createContainer, InjectionMode } from 'awilix';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

export default container;
