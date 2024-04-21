import {GeneralModel} from "./general.model";

export interface UserPlantDTO {
  // indefication information
  userId: string;
  journalId?: string;
  plantId: string; // use to pull the plant name and graphic

  // plant information
  dialog?: string;
  stage: PlantStage;
  currentStepCount?: number; // number of steps taken with this level
  totalStepCount?: number; // total number of steps taken with this plant
}

export interface UserPlant extends GeneralModel, UserPlantDTO { }

export enum PlantStage {
  FIRST = 'gs://flora-fit.appspot.com/seed.png',
  SECOND = 'gs://flora-fit.appspot.com/plant_second.png',
  THIRD = 'gs://flora-fit.appspot.com/california-poppy.png'
}