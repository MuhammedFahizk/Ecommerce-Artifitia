import * as authController from './auth.controller.js';
import * as userController from './user.controller.js';
import * as categoryController from './category.controller.js';
import * as productController from './product.controller.js'

export default {
  ...authController,
  ...userController,
  ...categoryController,
  ...productController
};
