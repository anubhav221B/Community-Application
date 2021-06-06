import { IUser } from "./User";

export interface IResponse {
  jwt: string,
  user: IUser
}
