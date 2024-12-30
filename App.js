// Importa las bibliotecas necesarias de React y React Navigation.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenedor principal de navegación.
import { createStackNavigator } from '@react-navigation/stack'; // Creador de un stack de navegación.
import { Button } from 'react-native'; // Componente de botón para la interfaz.

import HomeScreen from './app/screens/HomeScreen'; // Pantalla principal.
import NoteDetailScreen from './app/screens/NoteDetailScreen'; // Pantalla de detalles de una nota.
import CreateNoteScreen from './app/screens/CreateNoteScreen'; // Pantalla para crear una nueva nota.

// Crea un stack de navegación.
const Stack = createStackNavigator();

// Componente principal de la aplicación.
export default function App() {
  return (
    // Contenedor de navegación que envuelve todas las pantallas y maneja la navegación.
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {' '}
        {/* Define el stack de pantallas y establece la inicial */}
        {/* Pantalla principal: Home */}
        <Stack.Screen
          name="Home" // Nombre de la pantalla.
          component={HomeScreen} // Componente que renderiza esta pantalla.
          options={({ navigation }) => ({
            // Opciones específicas para la pantalla Home.
            title: 'Mis Notas', // Título mostrado en la barra superior.
            headerRight: () => (
              // Botón en la parte derecha del header para crear una nueva nota.
              <Button
                onPress={() => navigation.navigate('CreateNote')} // Navega a la pantalla CreateNote.
                title="Nueva" // Texto del botón.
                color="#007bff" // Color del botón.
              />
            ),
          })}
        />
        {/* Pantalla de detalles de una nota */}
        <Stack.Screen
          name="NoteDetail" // Nombre de la pantalla.
          component={NoteDetailScreen} // Componente que renderiza esta pantalla.
          options={{ title: 'Detalle de Nota' }} // Opciones de título para esta pantalla.
        />
        {/* Pantalla para crear una nueva nota */}
        <Stack.Screen
          name="CreateNote" // Nombre de la pantalla.
          component={CreateNoteScreen} // Componente que renderiza esta pantalla.
          options={{ title: 'Crear Nota' }} // Opciones de título para esta pantalla.
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
