"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const utils_1 = require("../../../utils");
const userController_1 = require("../../controllers/userController");
const rolebasedMiddleware_1 = require("../../middlewares/rolebasedMiddleware");
const userRouter = express_1.default.Router();
userRouter.post('/register', userController_1.registerUserController);
userRouter.post('/login', passport_1.default.authenticate('local', { session: false }), userController_1.loginUserController);
userRouter.post('/logout', userController_1.logoutUserController);
userRouter.get('/refreshtoken', passport_1.default.authenticate('refresh-jwt', { session: false }), userController_1.refreshTokenController);
userRouter.get('/private', passport_1.default.authenticate('jwt', { session: false }), userController_1.protectedRouteController);
userRouter.get('users', passport_1.default.authenticate('jwt', { session: false }), (0, rolebasedMiddleware_1.checkIsInRole)(utils_1.ROLES.Admin));
exports.default = userRouter;
