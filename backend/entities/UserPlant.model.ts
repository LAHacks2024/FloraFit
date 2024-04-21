import {GeneralModel} from "./general.model";

export interface UserPlantDTO {
  // indefication information
  userId: string;
  jounralID: string;
  plantID: string; // use to pull the plant name and graphic

  // plant information
  dialog: string;
  stage: PlantStage;
  currentStepCount: number; // number of steps taken with this level
  totalStepCount: number; // total number of steps taken with this plant
}

export interface UserPlant extends GeneralModel, UserPlantDTO { }

export enum PlantStage {
  FIRST = 'url to image',
  SECOND = 'url to second',
  THIRD = 'query'
}