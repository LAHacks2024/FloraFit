import { collection, query } from "firebase/firestore"
import { View, Text } from "react-native"
import { UserJournals } from "../../backend/api/userJournal"


export default function OtherJournalers({route}){
    //need to get the stop's location
    //query all journals at the stop's location,
    //every journal has a user id
    //get the current user
    //query all journals that 

    console.log(route)

    const stopUserJournals = new UserJournals()
    // const locationQuery = stopUserJournals.get(route.params.stopName)
    console.log('route:')
    console.log(route.params.params.stopName)
    // console.log(route.params)
    const stopLocationStr = route.params.params.stopName
    console.log(stopUserJournals.getWhere([["location", "==", stopLocationStr]]))


    return (
        <View
        style={{
            flex:1
        }}
        >
        <Text>Hello</Text>
        
        </View>
    )
}