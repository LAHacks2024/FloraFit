import {GeneralModel} from "./general.model";

export interface UserJournalDTO {
  location?: string;
  prompt: string;
  response: string;
}

export interface UserJournal extends GeneralModel, UserJournalDTO{}