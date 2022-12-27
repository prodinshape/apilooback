import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Call extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.calls)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.calls)
  workspace: Workspace;
}
