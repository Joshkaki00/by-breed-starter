import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { cats, dogs } from './breeds.js';

// Component to render each breed item
const BreedItem = ({ item }) => {
  return (
    <View>
      <Text>{item.breed}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...cats, ...dogs]}
        renderItem={({ item }) => <BreedItem item={item} />}
        keyExtractor={(item) => item.breed}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Makes FlatList fill the screen
    backgroundColor: '#fff',
  },
});
