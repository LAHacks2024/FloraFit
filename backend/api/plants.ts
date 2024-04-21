import {Plant, PlantDTO} from "../entities/plant.model";
import {FloraFirebase} from "./FloraFirebase";

export class PlantsDB extends FloraFirebase<Plant, PlantDTO> {
    constructor() {
        super('plants');
    };
}