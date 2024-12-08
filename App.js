import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import HomeScreen from './app/screens/HomeScreen';
import NoteDetailScreen from './app/screens/NoteDetailScreen';
import CreateNoteScreen from './app/screens/CreateNoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Mis Notas',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('CreateNote')}
                title="Nueva"
                color="#007bff"
              />
            ),
          })}
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: 'Detalle de Nota' }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNoteScreen}
          options={{ title: 'Crear Nota' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
