import userModel from '../models/user.model'
import {IUserInputs} from '../types/user.type'


export const  createUserRepo = async ({name,phone,password} : IUserInputs)  =>{
        try {
            
            const user = new userModel({
                name,
                phone,
                password,
                role : 'Employee'
            })
             
            await user.save()
            return user

        } catch (error:any) {
            throw new Error(error.message)
          }
    }

 export const  findUserRepo =async (phone : string)=>{
        try {
            const existingUser = await userModel.findOne({phone : phone})
            return existingUser
        } catch (error:any) {
            throw new Error(error.message)
          }
    }

export const findUserByTokenRepo = async (refreshToken : any)   =>{
    try {
        const existingUser = await userModel.findOne({refreshToken})
        return existingUser
    } catch (error:any) {
        throw new Error(error.message)
      }
} 

export const saveRefreshTokenRepo =async (userID: string , refreshToken :string) => {
    try {
        const user = await userModel.findById(userID).findOneAndUpdate({refreshToken:refreshToken})
        await user?.save();
    } catch (error:any) {
        throw new Error(error.message)
      }

    
}

export const  findUserByIdRepo = async (id : string) =>{
        try {
            const existingUser = await userModel.findById(id).select('-password').select('-refreshToken')
            return existingUser

        } catch (error:any) {
            throw new Error(error.message)
          }
    }

export const removeRefreshTokenRepo =async (refreshToken : string) => {
    try {
        const user = await findUserByTokenRepo(refreshToken)   
        if(user) {
            user.refreshToken = ''
            await user.save();
        }     
    } catch (error:any) {
        throw new Error(error.message)
      }
        
}

export const getCurrentTaskRepo = async (id:string ) => {
    const user  : any= await userModel.findById(id);
    if(user?.lastTask) {
        return user?.lastTask
    }else{
        return ''
    }
}

export const setCurrentTaskRepo =async (id:string , timeId : string) =>{
    const user = await userModel.findById(id).findOneAndUpdate({lastTask : timeId})
    await user?.save();
}
