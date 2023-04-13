import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateProductController } from './controllers/products/CreateProductController'
import { GetProductsController } from './controllers/products/GetProductsController'
import { DeleteProductController } from './controllers/products/DeleteProductController'
import { CreateCartController } from './controllers/cart/CreateCartController'
import { GetCartController } from './controllers/cart/GetCartController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { GetProductIdController } from './controllers/products/GetProductIdController'

import AdminMiddleware from './middlewares/AdminMiddleware'
import { UpdateProductController } from './controllers/products/UpdateProductController'

const router = Router()

// Users
router.post('/api/users', new CreateUserController().handle)
router.post('/api/login', new AuthUserController().handle)

// Products
<<<<<<< HEAD

// Adicionar AdminMiddleware para segurança das rotas.
// router.post('/api/product', AdminMiddleware, new CreateProductController().handle)

router.post('/api/product', new CreateProductController().handle)
router.get('/api/getproducts', new GetProductsController().handle)
router.get("/api/getproductid", new GetProductIdController().handle)
router.delete('/api/deleteproduct', new DeleteProductController().handle)
router.put("/api/updateproduct", new UpdateProductController().handle)
=======
router.post('/api/product', AdminMiddleware, new CreateProductController().handle)
router.get('/api/getproducts', AdminMiddleware, new GetProductController().handle)
router.delete('/api/deleteproduct', AdminMiddleware, new DeleteProductController().handle)
>>>>>>> 4f3f661e8df443d5e4ac8c132f44b38b2c5adbef

// Cart
router.post('/api/addcart', new CreateCartController().handle)
router.get('/api/getcart', new GetCartController().handle)

// Category
router.post('/api/category', new CreateCategoryController().handle)
router.get('/api/category', new ListCategoryController().handle)

export { router }