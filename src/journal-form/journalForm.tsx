import {Banner, Button, IconButton, PaperProvider} from "react-native-paper";
import {TextInput, View, Text, Image} from "react-native";
import {styles} from "./styles.ts";
import Layout from "../layout.tsx";
import {globalStyles} from "../globalStyles.ts";
import React from "react";

export default function JournalForm({navigation}) {

  return (
    <Layout>
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
    </Layout>
  );
}