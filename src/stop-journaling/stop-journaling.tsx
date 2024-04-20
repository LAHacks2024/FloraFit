import {StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TextInput} from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";

import React, { useEffect, useState } from 'react';
import {styles} from "./style";
import {globalStyles} from "../globalStyles";
import {Button} from "react-native-paper";


export default function StopJournaling({ route, navigation }) {
   const stopName = route.params.stopName; //route params
   const city = route.params.city; //route params

   const [loading, setLoading] = useState(false);
   const [apiData, setApiData] = useState<string>();
   const [value, onChangeText] = useState<string>('');
   const genAI = new GoogleGenerativeAI(
     "AIzaSyAt2C4Ppu9sl4ZNcqtwTyRt7ZfFVBzftwo"
   );

   useEffect(() => {
     const fetchData = async () => {
       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
       const prompt = `Come up with a journaling prompt based upon ${stopName} in ${city} to inspire introspection. Return a single question, and please make it short, nothing extra, thank you.`;
       const result = await model.generateContent(prompt);
       const response = result.response;
       const text = response.text();
       setApiData(text);
       setLoading(false);
     };

      fetchData();
    }, []);

  return (
    <View style={styles.container}>
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
          {!loading && <Text>{apiData}</Text>}
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
              numberOfLines={4}
              maxLength={40}
              onChangeText={onChangeText}
              value={value}
              placeholder={"Type your response for your journal here for your personal reflection."}
              style={styles.textInput}
              placeholderTextColor={'#989898'}
            />
          </SafeAreaView>

        </ScrollView>

      </View>
    </View>
  );


}
