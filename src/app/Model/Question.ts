import { IUser } from "./User";
import { IComment } from "./Comment";

export interface IQuestion {
  questionId: number,
  subject: string,
  product: string,
  body: string,
  date: string,
  answered: boolean,
  tag: string,
  countComment: number,
  user: IUser,
  comments: IComment[]
}
