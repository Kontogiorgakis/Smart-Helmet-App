import * as express from 'express';
import { ExampleController } from './example/example.controller';
import { ItemShopController } from './item-shop/item-shop.controller';
import { NotificationController } from './notification/notification.controller';
import { ProductController } from './product/product.controller';
import { ShopController } from './shop/shop.controller';
import { TaskController } from './task/task.controller';
const apiV1Router = express.Router();


apiV1Router
  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  )
  .use(
    '/item-shop',
    new ItemShopController().applyRoutes()
  )
  .use(
    '/tasks',
    new TaskController().applyRoutes()
  )
  /*Mine v1's*/
  .use(
    '/products',
    new ProductController().applyRoutes()
  )
  .use(
    '/notifications',
    new NotificationController().applyRoutes()
  )
  .use(
    '/shops',
    new ShopController().applyRoutes()
  );


export { apiV1Router };

