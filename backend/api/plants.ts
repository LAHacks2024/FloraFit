import {FloraFirebase} from "./FloraFirebase";
import {Plant, PlantDTO} from "../entities/plant.model";

export class Plants extends FloraFirebase<Plant, PlantDTO> {
  constructor() {
    super('plants');
  }
}