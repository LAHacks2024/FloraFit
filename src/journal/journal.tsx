import {styles} from "./styles.ts";
import {View, Text, TouchableOpacity} from "react-native";
import {IconButton, Modal, PaperProvider, Portal} from "react-native-paper";
import {useEffect, useState} from "react";
import {UserJournal} from "../../backend/entities/UserJournal.entity.ts";
import { UserJournals} from "../../backend/api/userJournal.ts";
import {AUTH} from "../../backend/environments.ts";

export default function Journal({navigation}) {
  const [journals, setJournals] = useState<UserJournal[]>([]);
  const [visible, setVisible] = useState(false);
  const [currentJournal, setCurrentJournal] = useState<UserJournal>(undefined)

  const showModal = (currJournal: UserJournal) => {
    setCurrentJournal(currJournal);
    setVisible(true);
  }
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const fetchJournals = async () => {
      const userJournal = new UserJournals();
      const journalCollection: UserJournal[] = await userJournal.getWhere([['userId', '==', AUTH.currentUser.uid]]);
      setJournals(journalCollection);
    }

    fetchJournals();
  }, []);

  return (
    <PaperProvider>
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
          <TouchableOpacity onPress={() => showModal(currJournal)} key={currJournal.id} style={{flexDirection: "row"}}>
            <View style={styles.left}>
              <Text style={styles.innerText}>
                {currJournal.createdAt.toDate().getMonth() + 1}/
                {currJournal.createdAt.toDate().getDate()}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.innerText}>Reflection at {currJournal.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <IconButton icon={'pencil'} style={{
        position: 'absolute',
        bottom: 40,
        right: 20,
        margin: 20,
        backgroundColor: '#759CB8',
      }} size={50} onPress={() => navigation.navigate('JournalForm')}
       />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalHeader}>{currentJournal?.prompt}</Text>
          <Text style={styles.modalText}>{currentJournal?.response}</Text>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}