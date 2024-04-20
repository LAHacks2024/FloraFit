import {GeneralModel} from "./general.model";

export interface UserPlantDTO {
  userId: string;
  plantId: string;
  stage: PlantStage;
  currentStepCount: number;
}

export interface UserPlant extends GeneralModel, UserPlantDTO { }

export enum PlantStage {
  FIRST = 'url to image',
  SECOND = 'url to second',
  THIRD = 'query'
}