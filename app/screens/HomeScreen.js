import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteList from '../components/NoteList';

const HomeScreen = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar notas..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <NoteList navigation={navigation} searchKeyword={searchKeyword} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
