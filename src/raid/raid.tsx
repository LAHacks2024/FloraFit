import { LinearGradient } from "expo-linear-gradient";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { View, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton, Card, Text } from "react-native-paper";
import { Boss } from "../../backend/entities/raid.model";


enum collectionStatuses {
    COLLECTED = 'collected',
    NOT_COLLECTED = 'not collected'
}



export default function RaidScreen({ route, navigation }){

    const stopName = route.params.stopName; //route params
    const city = route.params.city; //route params
    const bossOptions = [Boss.PEAR_TREE, Boss.SOUR_FIG, Boss.THISTLE]
    const pickedBoss = bossOptions[Math.floor(Math.random()*bossOptions.length)];
    
    const handleClose = () => {
        navigation.goBack();
      };

      const [collectionStatus, setCollectionStatus] = useState(collectionStatuses.NOT_COLLECTED)

      //write code to iterate over array of booleans and render checkmarks/who found it or not
      let toolStatus = [false,false,false];
      let toolUsers:string[] = [ '', '', ''];
    return (
        <View
        style={{
            flex:1

        }}>
            <LinearGradient
            colors={['#f06a6a', '#ffe3e3']}
            style={{
                flex:1
            }}>


            <View
            style={{flexDirection:'row'}}>
                <IconButton 
                icon={'close'} 
                onPress={handleClose} 
                iconColor={'#000'} size={35}
                style={{position:'absolute',top: 40,}}>

                </IconButton>

                <Image
                source={require('../../assets/Vector.png')}
                style={{position:'absolute',top: 50,left: 120}}/>
                <View
                style={{position:'absolute',right: 55,top: 50,}}>

                <Text
                style={{
                    fontFamily:'DMSans',
                    fontWeight:'bold',
                    fontSize: 30,
                    textAlign:'left',
                }}>Invasion!</Text>
                
                {/*Replace this with actual location of bleach*/}
                <Text
                style={{
                    fontFamily:'DMSans',
                    fontSize:16,
                    textAlign:'left',
                }}>{stopName}</Text>
                </View>

                <Card
                style={{
                    position:'absolute',
                    marginTop:400,
                    left: 50,
                    width: 300,
                    
                }}>
                    <Card.Content>
                        <Text style={{
                            textAlign:'center',
                            fontWeight:'bold',
                            fontFamily:'DMSans',
                            fontSize:25
                        }} variant="titleLarge">{pickedBoss}</Text>
                    </Card.Content>
                </Card>

                <Text
                    style={{
                        position:'absolute',
                        top:520,
                        fontFamily:'DMSans',
                        fontSize:16,
                        left: 40,
                        // bottom: 150,
                    }}
                >Find these tools to help stop this invasion!
                </Text>


            </View>

            <Image
            style={{
                height:200,
                width:300,
                borderRadius: 15,
                position:'absolute',
                top:150,
                left: 50,

            }}    
            source={require('../../assets/invasive_plants/Natural_Bridges_with_pelicans_and_cormorants.png')}/>

            {/* left tool */}
            <View
            style={{
                position:'absolute',
                top: 600,
                left: 20,
            }}>

                <Image
                source={require('../../assets/tool_background_raid.png')}/>
                <Image
                style={{
                    bottom: 70,
                    left: 10,
                }}
                source={require('../../assets/shovel.png')}/>

                {
                    toolStatus[0] ? (
                        <>
                            <Image 
                            style={{
                                position:'absolute',
                                bottom:50,
                                left: 50,
                            }}
                            source={require('../../assets/tool_gathered_checkmark.png')}/>
                            <Text
                            style={{
                                position:'absolute',
                                left: 10,
                                bottom: 10,
                                fontFamily:'DMSans',
                            }}
                            >Found by {toolUsers[0]} </Text>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            </View>

            {/* middle tool */}
            <View
            style={{
                position:'absolute',
                top: 600,
                left: 150,
            }}>
            <Image
            style={{
            }}
            source={require('../../assets/tool_background_raid.png')}/>

            <Image
            style={{
                bottom: 70,
                left: 10,
            }}
            source={require('../../assets/shovel.png')}/>
                            {
                    toolStatus[1] ? (
                        <>
                            <Image 
                            style={{
                                position:'absolute',
                                bottom:50,
                                left: 50,
                            }}
                            source={require('../../assets/tool_gathered_checkmark.png')}/>
                            <Text
                            style={{
                                position:'absolute',
                                left: 10,
                                bottom: 10,
                                fontFamily:'DMSans',
                            }}
                            >Found by {toolUsers[1]} </Text>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            
            </View>

            {/* right tool */}

            <View
            style={{
                position:'absolute',
                top: 600,
                left: 280,       
            }}
            >
            <Image
            style={{
            }}
            source={require('../../assets/tool_background_raid.png')}/>
            
            <Image
            style={{
                bottom: 70,
                left: 10,
            }}
            source={require('../../assets/shovel.png')}/>
            {
                toolStatus[2] ? (
                    <>  
                        <Image 
                        style={{
                            position:'absolute',
                            bottom:50,
                            left: 50,
                        }}
                        source={require('../../assets/tool_gathered_checkmark.png')}/>
                        <Text
                        style={{
                            position:'absolute',
                            left: 10,
                            bottom: 10,
                            fontFamily:'DMSans',
                        }}
                        >Found by {toolUsers[2]} </Text>
                    </>
                    ) : (
                        <>
                        </>
                    )
                }
            </View>

            <TouchableOpacity
            style={{
                borderRadius: 10,
                backgroundColor: '#2A3779',
                padding:20,
                width: 200,
                position:'absolute',
                top: 750,
                left: 90,
            }}
            ><Text
            style={{
                fontWeight: 'bold',
                fontFamily: 'DMSans',
                alignContent: 'center',
                color:'white',
                textAlign: 'center'
            }}>Find Items in Inventory</Text></TouchableOpacity>
            </LinearGradient>


        </View>
    )

}