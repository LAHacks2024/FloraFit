import {FloraFirebase} from "./api/FloraFirebase";

enum Flowers {
  YARROW = "Yarrow",
  CALIFORNIA_POPPY = "California Poppy",
  LUPINE = "Lupine",
  SAN_DIEGO_BIRDFOOD = "San Diego Birdfood",
  BLUE_FAX = "Blue Flax",
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

// get a random flower based on the their spanning frequency
const getRandomFlower = (): number => {
  const randInt = Math.floor(Math.random() * frequencyInfo.cumulative[frequencyInfo.cumulative.length - 1]);
  for (let i = 0; i < frequencyInfo.cumulative.length; i++) {
    if (randInt <= frequencyInfo.cumulative[i]) {
      return i;
    }
  }
}

export const getFlower = async (): Flower => {
  const randFlower = getRandomFlower();
}