import mongoose, { ConnectOptions } from 'mongoose'
import config from '../../config'



export default ()=>{
    mongoose.connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true
      } as ConnectOptions)
    console.log('Db Connected');
      
      mongoose.connection.on("error", (e) => {
        console.error(`Error ${e}`);
      });
}

