import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../config';
 


export const generatePassword = async (password : any) => {
        return await bcrypt.hash(password, Number(config.salt));
};


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
        return await bcrypt.compare(enteredPassword,savedPassword)
};

export const generateToken = async (payload : any) => {
        return await jwt.sign(payload,`${config.accessTokenKey}` , { expiresIn: '30d'} )
}

export const generateRefreshToken = async (payload : any) =>{
        return await jwt.sign(payload, `${config.refreshTokenKey}`, {expiresIn :'2d'} )
}

export const ROLES = {
        Admin: 'Admin',
        Employee: 'Employee'
      }

module.exports.FormateData = (data :any) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }