import {Banner, Button, IconButton, PaperProvider} from "react-native-paper";
import {TextInput, View, Text, Image, ScrollView, SafeAreaView} from "react-native";
import {styles} from "./styles.ts";
import Layout from "../layout.tsx";
import {globalStyles} from "../globalStyles.ts";
import React, {useState} from "react";
import {UserJournals} from "../../backend/api/userJournal.ts";
import {UserJournalDTO} from "../../backend/entities/UserJournal.entity.ts";
import {AUTH} from "../../backend/environments.ts";
import {UserPlants} from "../../backend/api/userPlants.ts";
import {PlantStage, UserPlantDTO} from "../../backend/entities/UserPlant.model.ts";

export default function JournalForm({navigation}) {
  const [question, setQuestion] = useState<string>('Prompt: how have you connected to nature through your community?');
  const [value, onChangeText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('')


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
            <Text style={globalStyles.headerInnerCellHeader}>Journal Entry</Text>
          </View>
          <Text style={globalStyles.headerCellText}>personal reflection</Text>
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