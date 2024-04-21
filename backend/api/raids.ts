import {FloraFirebase} from "./FloraFirebase";
import { Raid, RaidDTO } from "../entities/raid.model";

export class Raids extends FloraFirebase<Raid, RaidDTO> {
  constructor() {
    super('raids');
  }
}