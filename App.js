import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  KeyboardAvoidingView, Platform, TouchableOpacity,
  Keyboard, TouchableWithoutFeedback  // Add these
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
  const [selectedType, setSelectedType] = useState('cats');
  
  const currentBreeds = selectedType === 'cats' ? cats : dogs;
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
            {/* ...buttons... */}
          </View>
          
          {/* Search Input with Clear Button */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search breeds..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
            {/* Show X button only when there's text */}
            {searchTerm.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchTerm('')}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Breed List */}
          <FlatList
            data={filteredBreeds}
            renderItem={({ item }) => <BreedItem item={item} />}
            keyExtractor={(item) => item.breed}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
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
  // ... existing styles ...
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    position: 'relative',  // For absolute positioning of X button
  },
  searchInput: {
    flex: 1,  // Changed: now takes full width of container
    backgroundColor: '#fff',
    padding: 12,
    paddingRight: 40,  // Make room for X button
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // ... rest of styles ...
});
