import {FloraFirebase} from "./FloraFirebase";
import {UserJournalDTO} from "../entities/UserJournal.entity";

export class UserJournal extends FloraFirebase<UserJournal, UserJournalDTO> {
  constructor() {
    super('userJournals');
  }
}