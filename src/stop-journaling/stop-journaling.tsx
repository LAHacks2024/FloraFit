import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";

import React, { useEffect, useState } from 'react';
import {styles} from "./style";


export default function StopJournaling({ route }) {
   const stopName = route.params.stopName; //route params
   const city = route.params.city; //route params

   const [loading, setLoading] = useState(false);
   const [apiData, setApiData] = useState<string>();
   const [value, onChangeText] = useState('Type your response for your journal here for your personal reflection.');
   const [text, setText] = useState([]);
   const genAI = new GoogleGenerativeAI(
     "AIzaSyAt2C4Ppu9sl4ZNcqtwTyRt7ZfFVBzftwo"
   );
   const fetchData = async () => {
     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
     const prompt = `Come up with a journaling prompt based upon ${stopName} in ${city} to inspire introspection. Return a single question.`;
     const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();
     setApiData(text);
     setLoading(false);
   };

   useEffect(() => {
  
      fetchData();
    }, [text]);

  return (
    <View style={styles.container}>
      <Text>Hi</Text>
      <View>
        <Image source={require('../../assets/avatars/dino-buddy.png')}
               style={{height: 90, width: 90, resizeMode: 'contain'}}/>
        <Image/>

        <View>
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
              onChangeText={text => onChangeText(text)}
              value={value}
              style={{padding: 10}}
            />
          </SafeAreaView>

        </ScrollView>

      </View>
    </View>
  );


}
