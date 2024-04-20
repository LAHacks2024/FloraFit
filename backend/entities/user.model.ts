import {GeneralModel} from "./general.model";

export interface User extends GeneralModel, UserDTO {
}

export interface UserDTO {
  name: string;
  email: string;
  picture: string;
  soleMateId?: string;
}