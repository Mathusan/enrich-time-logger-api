import { Request, Response , NextFunction } from "express"
import {registerUserService, userFindByIDService, logoutUserService} from '../../services/user/userService'

export interface CustomRequest extends Request {
    user: {
        accessToken : string,
        refreshToken : string
    }
   }


export const registerUserController = async (req :Request,res : Response,next : NextFunction) =>{
        try {
            const {name,phone,password} = req.body
            const data = await registerUserService({name,phone,password})
            res.cookie('jwt',data.refreshToken, {httpOnly:true , sameSite:'strict', maxAge:24*60*60*1000})
            return res.json({
                accessToken:data.accessToken
            })
            
        } catch (error : any) {
            next(error)
        }
    }

export const loginUserController = async (req : Request,res : Response,next : NextFunction) =>{
        try {
            const {accessToken , refreshToken} = (req as CustomRequest)?.user
            res.cookie('jwt',refreshToken, {httpOnly:true , sameSite:'strict', maxAge:24*60*60*1000})
            return res.json({
                accessToken
            })
        } catch (error : any) {
            next(error)
        }
    }

export const refreshTokenController = async (req : any, res : Response , next : NextFunction) =>{
    try {
        res.status(200).json({
            accessToken : req.user
         })
        } catch (error : any) {
            next(error)
        }

}    

export const logoutUserController =async (req : Request, res : Response , next : NextFunction) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); 
        const refreshToken = cookies.jwt;
    
        await logoutUserService(refreshToken)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });
        return res.sendStatus(204);
    } catch (error : any) {
        next(error)
    }

}


export const protectedRouteController = async (req : any,res : Response,  next : NextFunction) => {
    try {
        const user : any = await userFindByIDService(req.user.id)
        res.status(200).json({
           name : user.name
        })
    } catch (error : any) {
        next(error)
    }
}