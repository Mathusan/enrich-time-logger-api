import { AppError } from "../../utils/errorHandler";
import { logger } from "../../utils/logger"

const handleKnownExceptions = (err : any, res : any ) => {
    const { statusCode, message } = err;
    logger.log('error',message)
    res.status(statusCode).json({error: {message}});
};

const handleUnknownExceptions = (err : any, res : any) => {
    logger.log('error',err.message)
    res.status(500).json({ error: {message: 'Something went wrong.' }});
};


export const errorMiddleware= (err : any,req : any,res : any ,next : any) => {
    err instanceof AppError ? handleKnownExceptions(err,res) : handleUnknownExceptions(err,res)

}