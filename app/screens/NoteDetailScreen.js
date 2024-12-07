import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { saveNote } from '../utils/storage';

const NoteDetailScreen = ({ route, navigation }) => {
  const { note } = route.params || {};
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSaveNote = async () => {
    const noteToSave = {
      id: note?.id || Date.now(),
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    await saveNote(noteToSave);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Título de la nota"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Escribe tu nota aquí..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Guardar Nota</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NoteDetailScreen;
