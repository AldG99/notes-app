import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getNotes, deleteNote } from '../utils/storage'; // Importa funciones para obtener y eliminar notas del almacenamiento.

const NoteList = ({ navigation, searchKeyword = '' }) => {
  const [notes, setNotes] = useState([]); // Estado para almacenar la lista de notas.

  // Efecto para cargar y filtrar las notas cuando el componente se monta o cuando cambia el término de búsqueda.
  useEffect(() => {
    const loadNotes = async () => {
      const allNotes = await getNotes(); // Obtiene todas las notas desde el almacenamiento.
      const filteredNotes = searchKeyword
        ? allNotes.filter(
            note =>
              note.title.toLowerCase().includes(searchKeyword.toLowerCase()) || // Filtra por título.
              note.content.toLowerCase().includes(searchKeyword.toLowerCase()) // Filtra por contenido.
          )
        : allNotes;
      setNotes(filteredNotes); // Actualiza las notas mostradas.
    };

    loadNotes(); // Llama a la función para cargar notas.
  }, [searchKeyword]); // Dependencia del efecto: se ejecuta cuando cambia `searchKeyword`.

  // Maneja la eliminación de una nota.
  const handleDeleteNote = async noteId => {
    await deleteNote(noteId); // Elimina la nota del almacenamiento.
    setNotes(await getNotes()); // Recarga la lista de notas después de la eliminación.
  };

  // Renderiza cada nota en la lista.
  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem} // Estilo para cada elemento de la lista.
      onPress={() => navigation.navigate('NoteDetail', { note: item })} // Navega a los detalles de la nota.
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{item.title}</Text>{' '}
        {/* Título de la nota. */}
        <Text numberOfLines={2}>{item.content}</Text>{' '}
        {/* Contenido de la nota, limitado a 2 líneas. */}
      </View>
      <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
        {' '}
        {/* Botón para eliminar la nota. */}
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Componente principal: lista de notas.
  return (
    <FlatList
      data={notes} // Datos que se muestran en la lista.
      renderItem={renderNoteItem} // Función para renderizar cada elemento.
      keyExtractor={item => item.id.toString()} // Llave única para cada elemento.
      ListEmptyComponent={<Text style={styles.emptyText}>No hay notas</Text>} // Mensaje cuando la lista está vacía.
    />
  );
};

// Estilos para el componente.
const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row', // Coloca el contenido y el botón en fila.
    justifyContent: 'space-between', // Espacio entre el contenido y el botón.
    padding: 15, // Espaciado interno.
    borderBottomWidth: 1, // Línea separadora inferior.
    borderColor: '#e0e0e0', // Color de la línea separadora.
  },
  noteContent: {
    flex: 1, // Ocupa el espacio restante.
    marginRight: 10, // Margen derecho para separar del botón.
  },
  noteTitle: {
    fontWeight: 'bold', // Título en negrita.
    marginBottom: 5, // Espaciado inferior.
  },
  deleteButton: {
    color: 'red', // Color rojo para el botón de eliminar.
  },
  emptyText: {
    textAlign: 'center', // Texto centrado.
    marginTop: 50, // Margen superior para separación.
    color: '#888', // Color gris para el texto.
  },
});

export default NoteList; // Exporta el componente para usarlo en otros archivos.
