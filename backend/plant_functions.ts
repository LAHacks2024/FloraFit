import {Plant} from "./entities/plant.model";
import { Plants } from "./api/plants";
import { UserPlants } from "./api/userPlants";
import { PlantStage } from "./entities/UserPlant.model";

enum flowers {
  YARROW,
  CALIFORNIA_POPPY,
  LUPINE,
  SAN_DIEGO_BIRDFOOD,
  BLUE_FLAX,
}

const frequencyInfo = {
  "frequency": [6, 5, 4, 3, 2],
  "cumulative": []
}

// populate the cumulative frequency array
for (let i = 0; i < frequencyInfo.frequency.length; i++) {
  if (i === 0) {
    frequencyInfo.cumulative.push(frequencyInfo.frequency[i]);
  } else {
    frequencyInfo.cumulative.push(frequencyInfo.cumulative[i - 1] + frequencyInfo.frequency[i]);
  }
}

// get a random Plant based on the their spanning frequency
const getRandomPlant = (): string | null => {
  const randInt: number = Math.floor(Math.random() * frequencyInfo.cumulative[frequencyInfo.cumulative.length - 1]);
  let plant: number;
  for (let i = 0; i < frequencyInfo.cumulative.length; i++) {
    if (randInt <= frequencyInfo.cumulative[i]) {
      plant =  i;
      break;
    }
  }

  switch (plant) {
    case flowers.YARROW:
      return "Yarrow";
    case flowers.CALIFORNIA_POPPY:
      return "California Poppy";
    case flowers.LUPINE:
      return "Lupine";
    case flowers.SAN_DIEGO_BIRDFOOD:
      return "San Diego Birdfood";
    case flowers.BLUE_FLAX:
      return "Blue Flax";

    default:
      return null
  }
}

export const getPlant = async (userID: string, journalId: string) => {
  const plantsDB = new Plants();
  const userPlantsDB = new UserPlants();

  const randPlantName:string | null= getRandomPlant();
  if (!randPlantName) {
    const randPlant: Plant = await plantsDB.getWhere([["name", "==", randPlantName]])[0]; // get the plants info from the db
    const plantDialoge = randPlant.dialog[Math.floor(Math.random() * randPlant.dialog.length)]; // get a random dialog
    userPlantsDB.create({
      userId: userID, 
      plantId: randPlant.id,
      journalId: journalId,
      dialog: plantDialoge,
      stage: PlantStage.FIRST,
      currentStepCount: 0,
      totalStepCount: 0
    }); // create a new userPlant
  }
  
}