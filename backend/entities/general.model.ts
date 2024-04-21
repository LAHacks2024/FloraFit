import { Timestamp } from "firebase/firestore";

export interface GeneralModel {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}