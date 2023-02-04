
export interface IUser {
  id:string
  name: string
  phone: string
  password: string
  refreshToken: string
}

export interface IUserInputs {
  name:string,
  phone:string,
  password:string
}
