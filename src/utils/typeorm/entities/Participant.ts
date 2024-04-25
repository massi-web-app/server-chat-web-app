import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";


@Entity({ name: "participants" })
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  @JoinTable()
  conversations: Conversation[];

}