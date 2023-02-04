"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeJwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../../config"));
const initializeJwtStrategy = (passport) => {
    passport.use('jwt', new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config_1.default.accessTokenKey,
        ignoreExpiration: false
    }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return done(null, payload);
        }
        catch (error) {
            return done(null, false, { message: error.message });
        }
    })));
};
exports.initializeJwtStrategy = initializeJwtStrategy;
