export interface UserDto {
  id: string;
  auth0Id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UpdateUserBody {
  name?: string;
  email?: string;
}
