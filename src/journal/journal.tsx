import {styles} from "./styles.ts";
import {View, Text} from "react-native";
import {IconButton} from "react-native-paper";
import {useEffect, useState} from "react";
import {UserJournal} from "../../backend/entities/UserJournal.entity.ts";
import { UserJournals} from "../../backend/api/userJournal.ts";
import firebase from "firebase/compat";
import { USER_ID } from "../../backend/environments.ts";
import Timestamp = firebase.firestore.Timestamp;

export default function Journal({navigation}) {
  const [journals, setJournals] = useState<UserJournal[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const userJournal = new UserJournals();
      const journalCollection: UserJournal[] = await userJournal.getWhere([['userId', '==', USER_ID]]);
      setJournals(journalCollection);
    }

    fetchJournals();
  }, []);

  return (
    <>
      <View style={{flexDirection: "row"}}>
        <View style={[styles.left, styles.topHeader]}>
          <IconButton style={{marginBottom: 45}} size={40} icon={'close'} onPress={() => navigation.navigate('Greenhouse')} />
        </View>
        <View style={[styles.right, styles.topHeader]}>
          <Text style={styles.header}>Journal</Text>
        </View>
      </View>
      <View>
        {journals.map((currJournal) => (
          <View key={currJournal.id} style={{flexDirection: "row"}}>
            <View style={styles.left}>
              <Text style={styles.innerText}>
                {currJournal.createdAt.toDate().getMonth() + 1}/
                {currJournal.createdAt.toDate().getDate()}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.innerText}>Reflection at {currJournal.location}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}