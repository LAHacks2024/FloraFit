import {GeneralModel} from "./general.model";

export interface User extends GeneralModel {
  name: string;
  email: string;
  picture: string;
}