import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserResponseObjectDTO } from './user-response.dto';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @Column({ type: 'text', unique: true }) username: string;

  @Column('text') password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author) ideas: IdeaEntity[];

  @ManyToMany(type => IdeaEntity, { cascade: true })
  @JoinTable()
  bookmarks: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserResponseObjectDTO {
    const { id, created, username, token } = this;
    const responseObject: UserResponseObjectDTO = { id, created, username };

    if (this.ideas) {
      responseObject.ideas = this.ideas;
    }
    if (this.bookmarks) {
      responseObject.bookmarks = this.bookmarks;
    }
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(): string {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }

}
