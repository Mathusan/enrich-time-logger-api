import  {findUserRepo,createUserRepo, findUserByIdRepo ,findUserByTokenRepo , saveRefreshTokenRepo, removeRefreshTokenRepo, getCurrentTaskRepo, setCurrentTaskRepo} from '../../database/repository/user.repository'
import { IUser } from '../../database/types/user.type'
import { generatePassword, generateRefreshToken, generateToken, validatePassword } from '../../utils'
import { AppError } from '../../utils/errorHandler'

export interface RegisterInputs {
    name:string,
    phone:string,
    password:string
  }
  
  export interface LoginInputs {    
    phone:string,
    password:string
  }

export const registerUserService = async (userInputs: RegisterInputs) => {
    const { name,phone, password} = userInputs
    
        
    const checkExistingUser : any= await findUserRepo(phone)
    

    if(!checkExistingUser){ 
        
        
        let hashedPassword = await generatePassword(password)

        const newUser : any = await createUserRepo({name,phone,password:hashedPassword})
        
        const accessToken = await generateToken({phone: newUser.phone, id: newUser.id , role : newUser.role})

        const refreshToken = await generateRefreshToken({name: newUser.name , id: newUser.id})

        await saveRefreshTokenRepo(newUser.id,refreshToken)
        
        return {id:newUser.id, accessToken,name:newUser.name,refreshToken}

    } else {
        throw new AppError(409,"Phone Already Registered")
    }
        

}

export const loginUserService = async (userInputs : LoginInputs) =>{

    const {phone,password} = userInputs

        const existingUser :any = await findUserRepo(phone)

        if (existingUser) {
            
            const  validatedPassword = await validatePassword(password, existingUser.password)
            

            if(validatedPassword){
                    const accessToken = await generateToken({phone: existingUser.phone, id: existingUser.id , role : existingUser.role})   
                    const refreshToken = await generateRefreshToken({name:existingUser.name,id : existingUser.id})

                    await saveRefreshTokenRepo(existingUser.id,refreshToken)

                    return {id: existingUser.id,name:existingUser.name,  accessToken,refreshToken }
            }else { 
                throw new AppError(401,"Incorrect Password")
            }
        }else {
            throw new AppError(401,"User not found")
        }
}

export const logoutUserService =async (refreshToken : string) => {
    try {
        await removeRefreshTokenRepo(refreshToken)
    } catch (error:any) {
        throw new Error(error.message)
    }
    
}

export const RefreshTokenService = async (refreshToken:string) => {
    try {
        const user  = await findUserByTokenRepo(refreshToken)
        return user
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const userFindByIDService = async (userID : IUser['id']) => {
    try {
        const user = await findUserByIdRepo(userID)
        return user
    } catch (error:any) {
        throw new Error(error.message)
    }
}    

export const getCurrentTaskOfUserService = async (id : string) => {
    try {
        const taskId = await getCurrentTaskRepo(id)
        return taskId

    } catch (error:any) {
        throw new Error(error.message)
    }      
}

export const setCurrentTaskOfUserService = async (id: string , taskId : string ) => {
    try {
        await setCurrentTaskRepo(id,taskId)

    } catch (error:any) {
        throw new Error(error.message)
    }   
}
