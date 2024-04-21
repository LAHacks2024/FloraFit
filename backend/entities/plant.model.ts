import {GeneralModel} from "./general.model";

export interface PlantDTO {
  name: string;
  description: string;
  dialog: string[];
  imageURL: string;
  discoveryLocation: number;
}

export interface Plant extends GeneralModel, PlantDTO {}