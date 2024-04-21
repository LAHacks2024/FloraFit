import {GeneralModel} from "./general.model";

export interface PlantDTO {
  name: string;
  dexDescription: string;
  dialog: string[];
  imageURL: string;
  discoveryLocation: number;
}

export interface Plant extends GeneralModel, PlantDTO {}