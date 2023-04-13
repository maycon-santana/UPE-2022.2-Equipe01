import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateProductController } from './controllers/products/CreateProductController'
import { GetProductController } from './controllers/products/GetProductController'
import { DeleteProductController } from './controllers/products/DeleteProductController'
import { CreateCartController } from './controllers/cart/CreateCartController'
import { GetCartController } from './controllers/cart/GetCartController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import AdminMiddleware from './middlewares/AdminMiddleware'
import { CreateAssessmentController } from './controllers/assessment/CreateAssessmentController'

const router = Router()

// Users
router.post('/api/users', new CreateUserController().handle)
router.post('/api/login', new AuthUserController().handle)

// Products
router.post('/api/product', AdminMiddleware, new CreateProductController().handle)
router.get('/api/getproducts', AdminMiddleware, new GetProductController().handle)
router.delete('/api/deleteproduct', AdminMiddleware, new DeleteProductController().handle)

// Cart
router.post('/api/addcart', new CreateCartController().handle)
router.get('/api/getcart', new GetCartController().handle)

// Category]
router.post('/api/category', AdminMiddleware, new CreateCategoryController().handle)
router.get('/api/category', AdminMiddleware, new ListCategoryController().handle)

// Assessment
router.post('/api/assessment', AdminMiddleware, new CreateAssessmentController().handle)

export { router }