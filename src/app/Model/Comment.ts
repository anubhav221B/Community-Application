import { IUser } from "./User";

export interface IComment {
  commentId: number,
  subject: string,
  body: string,
  date: string,
  correct: boolean,
  liked: boolean,
  countLike: number,
  user: IUser
}
