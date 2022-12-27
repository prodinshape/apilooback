import { Call } from 'src/call/entities/call.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, JoinColumn, OneToMany } from 'typeorm';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({nullable: true})
  refreshToken: string | null;

  @OneToMany(() => Call, (call) => call.user)
  calls: Call[];

  @OneToMany(() => Workspace, (workspace) => workspace.user)
  workspaces: Workspace[];
}
