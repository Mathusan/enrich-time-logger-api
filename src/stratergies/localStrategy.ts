
import { PassportStatic } from 'passport';
import {Strategy } from 'passport-local';
import { loginUserService } from '../services/user/userService';
 

export const initializeLocalStrategy = (passport : PassportStatic)=> {
    passport.use(new Strategy({
        usernameField : "phone"
    }, async (phone,password,done) => { 
        try {
            const data =  await loginUserService({phone, password})
            return done(null,data)
        } catch (error : any) {
            return done(error,false)
        }   
    }))
}