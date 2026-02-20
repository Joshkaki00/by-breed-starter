import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const renderStars = (rating, maxRating = 5) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
};

export default function DetailScreen({ route }) {
  const { breed } = route.params;

DetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      breed: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
  
  // Calculate average rating
  const keys = Object.keys(breed).filter(key => key !== 'breed' && key !== 'name');
  const values = keys.map(key => breed[key]);
  const sum = values.reduce((total, val) => total + val, 0);
  const average = sum / values.length;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Breed Header */}
        <View style={styles.header}>
          <Text style={styles.breedName}>{breed.breed}</Text>
          <View style={styles.averageContainer}>
            <Text style={styles.averageLabel}>Overall Rating</Text>
            <Text style={styles.averageText}>
              {renderStars(average)} {average.toFixed(1)}
            </Text>
          </View>
        </View>
        
        {/* Properties List */}
        <View style={styles.propertiesContainer}>
          <Text style={styles.sectionTitle}>Characteristics</Text>
          {keys.map((key, index) => (
            <View key={key} style={[
              styles.propertyRow,
              index % 2 === 0 && styles.propertyRowAlt
            ]}>
              <Text style={styles.propertyLabel}>{key}</Text>
              <Text style={styles.propertyValue}>
                {renderStars(breed[key])} {breed[key]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breedName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  averageContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  averageLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  averageText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
  },
  propertiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  propertyRowAlt: {
    backgroundColor: '#f9f9f9',
  },
  propertyLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  propertyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
