import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { UserPlant, PlantStage } from "../../backend/entities/UserPlant.model.ts";
import { Plants } from "../../backend/api/plants.ts";
import { Images } from "../../backend/api/images.ts";
import { useState, useEffect } from "react";

const GreenHousePlant = (userPlant: UserPlant) => {
    const [plantImg, setPlantImg] = useState<string>(''); // [plantImgURL, setPlantImgURL
    const getPlantImg = async () => {
        const plantName = (await new Plants().get(userPlant.plantId)).name;
        if (userPlant.stage === PlantStage.THIRD) {
            return await new Images().getImage(plantName);
        } else {
            return await new Images().getImage(userPlant.stage);
        }
    }
    useEffect(() => {
        getPlantImg().then((img) => {
            setPlantImg(img);
        });
    }, []);
    
    return (
        <TouchableOpacity>
            <Image source={{uri: plantImg}} style={{width: 100, height: 110, resizeMode: 'contain'}}></Image>
        </TouchableOpacity>
    );
}

export default GreenHousePlant;