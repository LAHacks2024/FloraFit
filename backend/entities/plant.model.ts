import {GeneralModel} from "./general.model";

export interface PlantDTO {
  name: string;
  dialogue: string;
  imageURL: string;
  discoveryLocation: number;
}

export interface Plant extends GeneralModel, PlantDTO {}