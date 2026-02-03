import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { cats, dogs } from './breeds.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Component to render each breed item
const BreedItem = ({ item }) => {
  const keys = Object.keys(item).filter(key => key !== 'breed' && key !== 'name');
  
  // Calculate average rating
  const values = keys.map(key => item[key]);
  const sum = values.reduce((total, val) => total + val, 0);
  const average = sum / values.length;
  
  return (
    <View>
      <View style={styles.headerRow}>
        <Text>{item.breed}</Text>
        <Text>Avg: {average.toFixed(1)}</Text>
      </View>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
