import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  KeyboardAvoidingView, Platform, TouchableOpacity,
  Keyboard
} from 'react-native';

const renderStars = (rating, maxRating = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
};

// Component to render each breed item
const BreedItem = ({ item, onPress }) => {
  const keys = Object.keys(item).filter(key => key !== 'breed' && key !== 'name');

BreedItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};
  const values = keys.map(key => item[key]);
  const sum = values.reduce((total, val) => total + val, 0);
  const average = sum / values.length;
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.breedCard}>
        <View style={styles.headerRow}>
          <Text style={styles.breedName}>{item.breed}</Text>
          <Text style={styles.averageText}>
            {renderStars(average)} {average.toFixed(1)}
          </Text>
        </View>
        {keys.slice(0, 3).map(key => (
          <View key={key} style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>{key}</Text>
            <Text style={styles.propertyValue}>
              {renderStars(item[key])} {item[key]}
            </Text>
          </View>
        ))}
        {keys.length > 3 && (
          <Text style={styles.moreText}>Tap to see all {keys.length} characteristics →</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation, breeds }) {
  const [searchTerm, setSearchTerm] = useState('');

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  breeds: PropTypes.array.isRequired,
};
  
  // Filter breeds
  const filteredBreeds = breeds.filter(breed =>
    breed.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        {searchTerm.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => {
              setSearchTerm('');
              Keyboard.dismiss();
            }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Breed List */}
      <FlatList
        data={filteredBreeds}
        renderItem={({ item }) => (
          <BreedItem 
            item={item} 
            onPress={() => navigation.navigate('Detail', { breed: item })}
          />
        )}
        keyExtractor={(item) => item.breed}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    paddingRight: 40,
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
  breedCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breedName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  averageText: {
    fontSize: 16,
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
  moreText: {
    fontSize: 13,
    color: '#007AFF',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
