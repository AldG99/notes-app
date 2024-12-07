import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getNotes, deleteNote } from '../utils/storage';

const NoteList = ({ navigation, searchKeyword = '' }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const allNotes = await getNotes();
      const filteredNotes = searchKeyword
        ? allNotes.filter(
            note =>
              note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              note.content.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : allNotes;
      setNotes(filteredNotes);
    };

    loadNotes();
  }, [searchKeyword]);

  const handleDeleteNote = async noteId => {
    await deleteNote(noteId);
    setNotes(await getNotes());
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate('NoteDetail', { note: item })}
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text numberOfLines={2}>{item.content}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={notes}
      renderItem={renderNoteItem}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay notas</Text>}
    />
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  noteContent: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});

export default NoteList;
