import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

import TaskList from './src/components/TaskList';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [inputModal, setInputModal] = useState('');

  // bucando todas as tasks quando iniciar o app
  useEffect(() => {
    async function loadTasks() {
      // localizando um item no Storage
      const taskStorage = await AsyncStorage.getItem('@task');

      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    };

    loadTasks();
  }, []);

  // salvando caso tenha alguma task alterada
  useEffect(() => {
    async function saveTasks() {
      // salvando um item no Storage
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    };

    saveTasks();
  }, [task]);

  function handleAdd() {
    if (inputModal === '') return;

    const data = {
      key: inputModal,
      task: inputModal
    };

    setTask([...task, data]);
    setIsOpen(false);
    setInputModal('');
  };

  const handleDelete = useCallback((data) => {
    // vai retornar todos os itens menos o que o usuário clicou 
    const findItems = task.filter(result => result.key !== data.key);
    setTask(findItems);
  });

  return (
    // o SafeAreaView é para o teste não ficar encima da StatusBar no IOS
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171D31" barStyle="light-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>My tasks</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />

      <Modal animationType="slide" transparent={false} visible={IsOpen}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Ionicons 
                style={{ marginLeft: 5, marginRight: 5 }} 
                name="md-arrow-back" 
                size={40} 
                color="#FFF" 
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New task</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="What do you need to do today?"
              style={styles.input}
              value={inputModal}
              onChangeText={(text) => setInputModal(text)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Sign Up</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedButton 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setIsOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="#FFF" />
      </AnimatedButton>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171D31'
  },

  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF'
  },

  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    },
  },

  modal: {
    flex: 1,
    backgroundColor: '#171D31',
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: "#FFF",
  },

  modalBody: {
    marginTop: 15,
  },

  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },

  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5
  },

  handleAddText: {
    fontSize: 20,
  },
});
