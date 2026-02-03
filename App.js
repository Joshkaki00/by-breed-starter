import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { cats, dogs } from './breeds.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Component to render each breed item
const BreedItem = ({ item }) => {
  // Get all property keys except 'breed' (and 'name' if it exists)
  const keys = Object.keys(item).filter(key => key !== 'breed' && key !== 'name');
  
  return (
    <View>
      <Text>{item.breed}</Text>
      {keys.map(key => (
        <View key={key} style={styles.propertyRow}>
          <Text>{key}</Text>
          <Text>{item[key]}</Text>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <FlatList
          data={[...cats, ...dogs]}
          renderItem={({ item }) => <BreedItem item={item} />}
          keyExtractor={(item) => item.breed}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Makes FlatList fill the screen
    backgroundColor: '#fff',
  },
});
