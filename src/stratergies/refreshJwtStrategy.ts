import { ExtractJwt, Strategy} from 'passport-jwt'
import config from '../../config'
import { userFindByIDService } from '../services/user/userService'
import { generateToken } from '../utils'

export const initializeRefreshJwtStrategy = (passport : any)=> {
    passport.use('refresh-jwt',new Strategy({
        jwtFromRequest : ExtractJwt.fromExtractors([(request: any) =>{
            let data = request?.cookies['jwt'];
            if(!data){
                return null;
            }
            return data
        }]),
        secretOrKey : process.env.REFRESH_TOKEN_SECRET_KEY,

    }, async (payload,done) => {
        try {
            const user : any = await userFindByIDService(payload.id)
            const accessToken = await  generateToken({phone: user.phone, id: user.id , role : user.role})

            return done(null,accessToken)
        } catch (error : any) {
            return done(null,false,{message : error.message})
        }
    }))

}