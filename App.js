import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import { useState } from 'react';
import { cats, dogs } from './breeds.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const renderStars = (rating, maxRating = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
};

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
        {/* Stars with numeric average */}
        <Text style={styles.averageText}>
          {renderStars(average)} {average.toFixed(1)}
        </Text>
      </View>
      {keys.map(key => (
        <View key={key} style={styles.propertyRow}>
          <Text style={styles.propertyLabel}>{key}</Text>
          {/* Stars with numeric value */}
          <Text style={styles.propertyValue}>
            {renderStars(item[key])} {item[key]}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('cats'); // 'cats' or 'dogs'
  
  // Select breeds based on toggle
  const currentBreeds = selectedType === 'cats' ? cats : dogs;
  
  // Filter breeds
  const filteredBreeds = currentBreeds.filter(breed =>
    breed.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Toggle Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.button, 
                selectedType === 'cats' && styles.buttonActive
              ]}
              onPress={() => setSelectedType('cats')}
            >
              <Text style={[
                styles.buttonText,
                selectedType === 'cats' && styles.buttonTextActive
              ]}>
                Cats
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                selectedType === 'dogs' && styles.buttonActive
              ]}
              onPress={() => setSelectedType('dogs')}
            >
              <Text style={[
                styles.buttonText,
                selectedType === 'dogs' && styles.buttonTextActive
              ]}>
                Dogs
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search breeds..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          
          {/* Breed List */}
          <FlatList
            data={filteredBreeds}
            renderItem={({ item }) => <BreedItem item={item} />}
            keyExtractor={(item) => item.breed}
          />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  buttonTextActive: {
    color: '#fff',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
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
