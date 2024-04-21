import {Image, SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import {GoogleGenerativeAI} from "@google/generative-ai";

import React, {useEffect, useState} from 'react';
import {styles} from "./style";
import {globalStyles} from "../globalStyles";
import {Banner, Button} from "react-native-paper";
import Layout from "../layout.tsx";
import {UserJournals} from "../../backend/api/userJournal.ts";
import {UserJournalDTO} from "../../backend/entities/UserJournal.entity.ts";
import {AUTH} from "../../backend/environments.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {PlantStage, UserPlantDTO} from "../../backend/entities/UserPlant.model.ts";


export default function StopJournaling({ route, navigation }) {
   const stopName = route.params.stopName; //route params
   const city = route.params.city; //route params

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('')
   const [loading, setLoading] = useState(false);
   const [question, setQuestion] = useState<string>();
   const [value, onChangeText] = useState<string>('');
   const genAI = new GoogleGenerativeAI(
     "AIzaSyAt2C4Ppu9sl4ZNcqtwTyRt7ZfFVBzftwo"
   );

   const onSubmit = async () => {
     if (value.length < 50) {
       setErrorMessage('Please have more than 50 characters');
       setHasError(true);
       return;
     }

     setHasError(false);
     setErrorMessage('');

     const journal = new UserJournals();
     const journalData: UserJournalDTO = {
       userId: AUTH.currentUser.uid,
       prompt: question,
       response: value,
     }

     await journal.create(journalData);

     const plantOptions = ['BTs7Rah7NzS1l2fAbEqR', 'WyQ7oPOi3M0bge42bRa4', 'k5PoBBk1KZqaE9F2bXTH', 'lSMMScMgmbHbsMrhSyQF', 'ymGW5WrOFpnj0mCBduEX']
     const pickedPlant = plantOptions[Math.floor(Math.random()*plantOptions.length)];
     const userPlant = new UserPlants();
     const plant: UserPlantDTO = {
       userId: AUTH.currentUser.uid,
       plantId: pickedPlant,
       stage: PlantStage.FIRST,
       currentStepCount: 0,
     };
     await userPlant.create(plant);

     await navigation.navigate('NewPlant');
   }

   useEffect(() => {
     const fetchData = async () => {
       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
       const prompt = `Come up with a journaling prompt based upon ${stopName} in ${city} to inspire introspection. Return a single question, and please make it short, nothing extra, thank you.`;
       const result = await model.generateContent(prompt);
       const response = result.response;
       const text = response.text();
       setQuestion(text);
       setLoading(false);
     };

      fetchData();
    }, []);

  return (
    <Layout>
      <Banner actions={[]} visible={hasError}>
        {errorMessage}
      </Banner>
      <View style={globalStyles.header}>
        <Button style={globalStyles.backButton} icon={"arrow-left-bold-circle"}
                onPress={() =>
                  navigation.goBack()
                }
        >
          <></>
        </Button>
        <View style={globalStyles.headerCell}>
          <View style={globalStyles.headerInnerCell}>
            <Image source={require('../../assets/markers/marker-bw.png')} style={{width: 28, height: 28}}></Image>
            <Text style={globalStyles.headerInnerCellHeader}>Root Route</Text>
          </View>
          <Text style={globalStyles.headerCellText}>natural bridges beach</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.question}>
          {!loading && <Text>{question}</Text>}
          {loading && <Text>Loading...</Text>}
        </View>

        <ScrollView>
          <SafeAreaView
            style={{
              backgroundColor: value,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
            }}>
            <TextInput
              editable
              multiline
              onChangeText={onChangeText}
              value={value}
              placeholder={"Type your response for your journal here for your personal reflection."}
              style={styles.textInput}
              placeholderTextColor={'#989898'}
            />
          </SafeAreaView>
        </ScrollView>
        <Image
          style={{
            // height: 96,
            // width: 112,
            position: "absolute",
            bottom: -20,
            zIndex: 2,
            right: -20,
          }}
          source={require('../../assets/avatars/journal-avatar.png')}
        ></Image>
      </View>

      <Button contentStyle={{ paddingVertical: 15, }} onPress={onSubmit} textColor={'#fff'} style={styles.submitButton}>
        <Text style={styles.buttonText}>finished!</Text>
      </Button>
    </Layout>
  );


}
