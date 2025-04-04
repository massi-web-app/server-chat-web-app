import {User} from "./typeorm";

export type CreateUserDetials = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type ValidateUserDetails = {
    email: string;
    password: string;
};

export type FindUserParams = Partial<{
    id: number;
    email: string;
}>;

export type CreateConversationParams = {
    recipientId: number;
    message: string;
}

export type ConversationIdentityType = "author" | "recipient";

export type FindParticipantParams = Partial<{
    id: number;
}>

export interface AuthenticatedRequest extends Request {
    user: User;
}

export type CreateParticipantParams = {
    id: number;
}


export type CreateMessageParams = {
    content: string;
    conversationId: number;
    user: User;
}



