import express, {Router} from 'express'
import passport from 'passport'
import { ROLES } from '../../../utils'
import {registerUserController,loginUserController, protectedRouteController,refreshTokenController,logoutUserController} from '../../controllers/userController'
import { checkIsInRole } from '../../middlewares/rolebasedMiddleware'

const userRouter : Router = express.Router()


userRouter.post('/register',registerUserController)
userRouter.post('/login',passport.authenticate('local',{session:false}),loginUserController)
userRouter.post('/logout',logoutUserController)
userRouter.get('/refreshtoken',passport.authenticate('refresh-jwt', {session: false}),refreshTokenController)
userRouter.get('/private', passport.authenticate('jwt', { session : false}) ,protectedRouteController)
  
userRouter.get('users',passport.authenticate('jwt', { session : false}), checkIsInRole(ROLES.Admin),)


export default userRouter

