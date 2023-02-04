import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../config';
 


export const generatePassword = async (password : any) => {
        return await bcrypt.hash(password, Number(process.env.SALT));
};


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
        return await bcrypt.compare(enteredPassword,savedPassword)
};

export const generateToken = async (payload : any) => {
        return await jwt.sign(payload,`${process.env.ACCESS_TOKEN_SECRET_KEY}` , { expiresIn: '30d'} )
}

export const generateRefreshToken = async (payload : any) =>{
        return await jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET_KEY}`, {expiresIn :'2d'} )
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