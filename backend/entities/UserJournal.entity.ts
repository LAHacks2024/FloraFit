import {GeneralModel} from "./general.model";

export interface UserJournalDTO {
  userId: string;
  location?: string;
  prompt: string;
  response: string;
}

export interface UserJournal extends GeneralModel, UserJournalDTO{}