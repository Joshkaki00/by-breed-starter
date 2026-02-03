import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useState } from 'react';
import { cats, dogs } from './breeds.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Component to render each breed item
const BreedItem = ({ item }) => {
  const keys = Object.keys(item).filter(key => key !== 'breed' && key !== 'name');
  const values = keys.map(key => item[key]);
  const sum = values.reduce((total, val) => total + val, 0);
  const average = sum / values.length;
  
  return (
    <View style={styles.breedCard}>
      <View style={styles.headerRow}>
        <Text style={styles.breedName}>{item.breed}</Text>
        <Text style={styles.averageText}>Avg: {average.toFixed(1)}</Text>
      </View>
      {keys.map(key => (
        <View key={key} style={styles.propertyRow}>
          <Text style={styles.propertyLabel}>{key}</Text>
          <Text style={styles.propertyValue}>{item[key]}</Text>
        </View>
      ))}
    </View>
  );
};

const BreedItem = ({ item }) => {
  const keys = Object.keys(item).filter(key => key !== 'breed' && key !== 'name');
  const values = keys.map(key => item[key]);
  const sum = values.reduce((total, val) => total + val, 0);
  const average = sum / values.length;
  
  return (
    <View style={styles.breedCard}>
      <View style={styles.headerRow}>
        <Text style={styles.breedName}>{item.breed}</Text>
        <Text style={styles.averageText}>Avg: {average.toFixed(1)}</Text>
      </View>
      {keys.map(key => (
        <View key={key} style={styles.propertyRow}>
          <Text style={styles.propertyLabel}>{key}</Text>
          <Text style={styles.propertyValue}>{item[key]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  breedCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,  // Left and right padding
    paddingVertical: 12,    // Top and bottom padding
    marginVertical: 8,      // Space between cards
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breedName: {
    fontSize: 24,           // Larger breed name
    fontWeight: 'bold',
    color: '#333',
  },
  averageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  propertyLabel: {
    fontSize: 14,
    color: '#666',
  },
  propertyValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
