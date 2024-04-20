import {GeneralModel} from "./general.model";

export interface UserPlantDTO {
  userId: string;
  plantId: string;
  stage: PlantStage;
  currentStepCount: number;
}

export interface UserPlant extends GeneralModel, UserPlantDTO { }

export enum PlantStage {
  FIRST = require('../../assets/plants/seed.png'),
  SECOND = require('../../assets/plants/plant_second.png'),
  THIRD = 'query'
}