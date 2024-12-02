import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNote = async note => {
  try {
    const existingNotes = await getNotes();

    const updatedNotes = note.id
      ? existingNotes.map(n => (n.id === note.id ? note : n))
      : [...existingNotes, { ...note, id: Date.now() }];

    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    return updatedNotes;
  } catch (error) {
    console.error('Error guardando nota:', error);
  }
};

export const getNotes = async () => {
  try {
    const notesJson = await AsyncStorage.getItem('notes');
    return notesJson ? JSON.parse(notesJson) : [];
  } catch (error) {
    console.error('Error obteniendo notas:', error);
    return [];
  }
};

export const deleteNote = async noteId => {
  try {
    const existingNotes = await getNotes();
    const updatedNotes = existingNotes.filter(note => note.id !== noteId);

    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    return updatedNotes;
  } catch (error) {
    console.error('Error eliminando nota:', error);
  }
};

export const searchNotes = async keyword => {
  try {
    const notes = await getNotes();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.content.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error('Error buscando notas:', error);
    return [];
  }
};
