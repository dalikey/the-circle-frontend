import { IDomain } from "../Interfaces/IDomain";
import { User } from "./User";

export interface ChatMessage extends IDomain {
    message: string
    writer: User
    receiverUser: User
    date: Date
}

export interface ChatMessageDTO extends IDomain{
    Message: string
    WebUserId: number
    ReceiverId: number
    Date: Date
}