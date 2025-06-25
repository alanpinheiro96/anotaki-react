
import React, { useState } from 'react'
import {
  Text, View, StyleSheet, FlatList, Image,
  TouchableOpacity, TextInput, Modal
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import moment from 'moment'
import 'moment/locale/pt-br'

const taskDB = [
  {
    id: 1,
    title: 'Ir ao mercado as 10:00',
    desc: 'Comprar itens para fazer churrasco',
    estimateAt: new Date('2025-06-01')
  },
  {
    id: 2,
    title: 'Dentista',
    desc: 'Consulta agendada as 16:30.',
    estimateAt: new Date('2025-06-02')
  },
  {
    id: 3,
    title: 'Estudar para a prova de Mobile II',
    desc: 'Revisar conteúdos de React Native e banco de dados',
    estimateAt: new Date('2025-06-03')
  },
  {
    id: 4,
    title: 'Levar o cachorro para passear',
    desc: 'Passeio rápido no quarteirão às 18:00',
    estimateAt: new Date('2025-06-04')
  },
  {
    id: 5,
    title: 'Reunião com o grupo do TCC',
    desc: 'Alinhar as últimas entregas e revisar documentação',
    estimateAt: new Date('2025-06-05')
  }
]

export default function Agenda() {
  const [notes, setNotes] = useState(taskDB)
  const [modalVisible, setModalVisible] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const deleteNote = id => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const renderRightActions = id => (
    <TouchableOpacity
      onPress={() => deleteNote(id)}
      style={styles.swipeDelete}
    >
      <FontAwesome name="trash" size={20} color="#fff" />
      <Text style={styles.swipeText}>Excluir</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    const formattedDate = moment(item.estimateAt).format('LL')
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.noteCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </Swipeable>
    )
  }

  const addNote = () => {
    if (newTitle.trim() === '' || newDesc.trim() === '') return
    const newNote = {
      id: Math.random(),
      title: newTitle,
      desc: newDesc,
      estimateAt: new Date()
    }
    setNotes([newNote, ...notes])
    setNewTitle('')
    setNewDesc('')
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/img/agenda.jpg')} style={styles.banner} />
    <Text style={styles.header}>Agenda</Text>


        <FlatList
          data={notes}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Título"
                value={newTitle}
                onChangeText={setNewTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Descrição"
                value={newDesc}
                onChangeText={setNewDesc}
                style={styles.input}
              />
              <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ marginTop: 10, color: 'red' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 170,
    borderRadius: 20
  },
  banner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: -10
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    paddingTop: 10
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  desc: {
    fontSize: 15,
    color: '#666',
    marginTop: 6
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginTop: 8
  },
  swipeDelete: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 12,
    marginVertical: 4
  },
  swipeText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8
  }
});