import {FloraFirebase} from "./FloraFirebase";
import {UserJournal, UserJournalDTO} from "../entities/UserJournal.entity";

export class UserJournals extends FloraFirebase<UserJournal, UserJournalDTO> {
  constructor() {
    super('userJournals');
  }
}