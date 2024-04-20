import {FloraFirebase} from "./FloraFirebase";
import {UserPlant, UserPlantDTO} from "../entities/UserPlant.model";

export class UserPlants extends FloraFirebase<UserPlant, UserPlantDTO>{
  constructor() {
    super('userPlants');
  }

}