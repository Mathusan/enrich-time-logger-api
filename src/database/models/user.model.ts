import { model, Schema } from "mongoose";
import { ROLES } from "../../utils";
import { IUser } from '../types/user.type'

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  
  phone: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  refreshToken : {type: String, required:false},

  role : {type : String, required : true , default : ROLES.Employee},

  lastTask : {type : String  }
  
});

export default model<IUser>("User", userSchema);