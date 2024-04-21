import { Timestamp } from "firebase/firestore";
import {GeneralModel} from "./general.model";

export interface RaidDTO {
   boss: Boss,
   raidStart: Timestamp,
   reqs: Boolean[],
   items: string[],
   contributors: string[],
}

export enum Boss {
   THISTLE = "Italian Thistle",
   PEAR_TREE = "Bradford Pear Tree",
   SOUR_FIG = "Sour Fig",

}
export interface Raid extends GeneralModel, RaidDTO {}