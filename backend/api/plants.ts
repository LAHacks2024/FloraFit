import {FloraFirebase} from "./FloraFirebase";
import {PlantDTO} from "../entities/plant.model";

export class Plants extends FloraFirebase<Plants, PlantDTO> {
  constructor() {
    super('plants');
  }
}