// Importa React y useState de React para poder gestionar el estado del componente.
import React, { useState } from 'react';

// Importa los componentes necesarios de React Native para crear la interfaz.
import {
  View, // Contenedor principal
  Text, // Texto
  TextInput, // Campo de texto para ingreso
  StyleSheet, // Estilos en línea
  TouchableOpacity, // Botón presionable
} from 'react-native';

// Importa la función para guardar la nota en el almacenamiento.
import { saveNote } from '../utils/storage';

const NoteDetailScreen = ({ route, navigation }) => {
  // Obtiene la nota desde los parámetros de la ruta, si existe.
  const { note } = route.params || {};

  // Establece el estado de título y contenido, usando valores predeterminados si la nota existe.
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  // Función que maneja el guardado de la nota
  const handleSaveNote = async () => {
    // Crea un objeto noteToSave, que contiene la información de la nota.
    const noteToSave = {
      id: note?.id || Date.now(), // Si hay un id de nota, lo usa, si no, genera uno nuevo con la fecha actual.
      title, // El título actual
      content, // El contenido actual
      updatedAt: new Date().toISOString(), // Fecha de actualización en formato ISO
    };

    // Llama a la función saveNote para almacenar la nota.
    await saveNote(noteToSave);

    // Regresa a la pantalla anterior después de guardar la nota.
    navigation.goBack();
  };

  return (
    // Vista principal del componente
    <View style={styles.container}>
      {/* Campo de entrada para el título de la nota */}
      <TextInput
        style={styles.titleInput} // Estilo aplicado al campo de texto
        placeholder="Título de la nota" // Texto que aparece cuando el campo está vacío
        value={title} // Valor actual del título
        onChangeText={setTitle} // Actualiza el estado de title cuando el texto cambia
      />

      {/* Campo de entrada para el contenido de la nota */}
      <TextInput
        style={styles.contentInput} // Estilo aplicado al campo de texto
        placeholder="Escribe tu nota aquí..." // Texto que aparece cuando el campo está vacío
        value={content} // Valor actual del contenido
        onChangeText={setContent} // Actualiza el estado de content cuando el texto cambia
        multiline // Permite varias líneas de texto
        textAlignVertical="top" // Alinea el texto en la parte superior del campo
      />

      {/* Botón para guardar la nota */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Guardar Nota</Text>
      </TouchableOpacity>
    </View>
  );
};

// Definición de los estilos para los componentes de la pantalla.
const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    padding: 20, // Espaciado interno de 20 píxeles
    backgroundColor: '#f5f5f5', // Color de fondo claro
  },
  titleInput: {
    fontSize: 18, // Tamaño de fuente para el título
    fontWeight: 'bold', // Negrita para el título
    marginBottom: 20, // Espacio en la parte inferior
    borderBottomWidth: 1, // Línea en la parte inferior
    borderBottomColor: '#ddd', // Color de la línea
  },
  contentInput: {
    flex: 1, // Hace que el campo de contenido ocupe todo el espacio disponible
    fontSize: 16, // Tamaño de fuente para el contenido
    backgroundColor: 'white', // Color de fondo blanco
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interno del campo
    textAlignVertical: 'top', // Alinea el texto en la parte superior
  },
  saveButton: {
    backgroundColor: '#007bff', // Color de fondo azul para el botón
    padding: 15, // Espaciado interno del botón
    borderRadius: 10, // Bordes redondeados en el botón
    marginTop: 20, // Espacio en la parte superior del botón
    alignItems: 'center', // Centra el contenido del botón
  },
  saveButtonText: {
    color: 'white', // Color del texto en el botón (blanco)
    fontSize: 16, // Tamaño de fuente del texto en el botón
    fontWeight: 'bold', // Texto en negrita
  },
});

// Exporta el componente para que pueda ser usado en otras partes de la aplicación
export default NoteDetailScreen;
