import {GeneralModel} from "./general.model";

export interface UserPlantDTO {
  userId: string;
  plantId: string;
  stage: PlantStage;
  currentStepCount: number;
}

export interface UserPlant extends GeneralModel, UserPlantDTO { }

export enum PlantStage {
  FIRST = 'gs://flora-fit.appspot.com/seed.png',
  SECOND = 'gs://flora-fit.appspot.com/plant_second.png',
  THIRD = 'gs://flora-fit.appspot.com/california-poppy.png'
}