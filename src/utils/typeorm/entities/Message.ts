import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Entity({ name: "messages" })
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: "created_at" })
  createdAt: number;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;


  @ManyToOne(() => Conversation,(conversation)=>conversation.messages)
  conversation: Conversation;
}