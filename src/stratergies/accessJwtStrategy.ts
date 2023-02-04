import { ExtractJwt, Strategy} from 'passport-jwt'
import config from '../../config'
import { userFindByIDService } from '../services/user/userService'

export const initializeJwtStrategy = (passport : any)=> {
    passport.use('jwt',new Strategy({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.ACCESS_TOKEN_SECRET_KEY,
        ignoreExpiration: false
    }, async (payload,done) => {
        try {
            return done(null,payload)
        } catch (error : any) {
            return done(null,false,{message : error.message})
        }
    }))

}