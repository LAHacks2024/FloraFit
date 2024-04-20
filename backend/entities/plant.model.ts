import {GeneralModel} from "./general.model";

export interface PlantDTO {
  dexDescription: string;
  imageURL: string;
}

export interface Plant extends GeneralModel, PlantDTO {}