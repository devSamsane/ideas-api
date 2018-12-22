import { IdeaEntity } from '../idea/idea.entity';

export class UserResponseObjectDTO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  bookmarks?: IdeaEntity[];
}
