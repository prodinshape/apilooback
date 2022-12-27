import { Call } from 'src/call/entities/call.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Workspace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToMany(() => Call, (call) => call.workspace)
  calls: Call[]

  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;
}
