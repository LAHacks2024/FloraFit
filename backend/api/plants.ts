import {Plant, PlantDTO} from "../entities/plant.model";
import {FloraFirebase} from "./FloraFirebase";
//test
export class Plants extends FloraFirebase<Plant, PlantDTO> {
    constructor() {
        super('plants');
    };
}