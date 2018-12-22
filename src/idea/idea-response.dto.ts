import { UserResponseObjectDTO } from '../user/user-response.dto';

export class IdeaResponseObjectDTO {
  id?: string;
  updated: Date;
  created: Date;
  idea: string;
  description: string;
  author: UserResponseObjectDTO;
  upvotes?: number;
  downvotes?: number;
}
