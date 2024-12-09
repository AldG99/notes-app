// Importa React y el hook useState para gestionar el estado del componente.
import React, { useState } from 'react';

// Importa los componentes necesarios de React Native para construir la interfaz.
import { View, StyleSheet, TextInput } from 'react-native';

// Importa SafeAreaView para manejar zonas seguras en dispositivos con notch.
import { SafeAreaView } from 'react-native-safe-area-context';

// Importa el componente NoteList, que muestra la lista de notas.
import NoteList from '../components/NoteList';

const HomeScreen = ({ navigation }) => {
  // Estado para almacenar el texto ingresado en el campo de búsqueda.
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    // SafeAreaView asegura que el contenido no se superponga con zonas inseguras.
    <SafeAreaView style={styles.container}>
      {/* Campo de entrada para buscar notas */}
      <TextInput
        style={styles.searchInput} // Aplica estilo al campo de búsqueda.
        placeholder="Buscar notas..." // Texto que aparece cuando el campo está vacío.
        value={searchKeyword} // El valor actual del texto ingresado.
        onChangeText={setSearchKeyword} // Actualiza el estado cuando cambia el texto.
      />
      {/* Componente que muestra la lista de notas filtradas según el término de búsqueda */}
      <NoteList navigation={navigation} searchKeyword={searchKeyword} />
    </SafeAreaView>
  );
};

// Definición de los estilos para los componentes de la pantalla.
const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible.
    padding: 10, // Agrega un espaciado interno de 10 píxeles.
    backgroundColor: '#f5f5f5', // Color de fondo claro para la pantalla.
  },
  searchInput: {
    height: 40, // Altura del campo de entrada.
    borderColor: '#ddd', // Color del borde del campo.
    borderWidth: 1, // Grosor del borde.
    borderRadius: 8, // Bordes redondeados para el campo.
    paddingHorizontal: 10, // Espaciado interno horizontal.
    marginBottom: 10, // Margen inferior para separar el campo del contenido siguiente.
    backgroundColor: 'white', // Fondo blanco para el campo de entrada.
  },
});

// Exporta el componente para que pueda ser usado en otras partes de la aplicación.
export default HomeScreen;
