import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cats, dogs } from './breeds.js';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Cats Stack Navigator
function CatsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="CatsList" 
        options={{ title: '🐱 Cat Breeds' }}
      >
        {(props) => <HomeScreen {...props} breeds={cats} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={({ route }) => ({ 
          title: route.params?.breed?.breed || 'Details',
        })}
      />
    </Stack.Navigator>
  );
}

// Dogs Stack Navigator
function DogsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4ECDC4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="DogsList" 
        options={{ title: '🐶 Dog Breeds' }}
      >
        {(props) => <HomeScreen {...props} breeds={dogs} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={({ route }) => ({ 
          title: route.params?.breed?.breed || 'Details',
        })}
      />
    </Stack.Navigator>
  );
}

// Main App with Tab Navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '600',
            },
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = focused ? 'paw' : 'paw-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen 
            name="Cats" 
            component={CatsStack}
            options={{
              tabBarLabel: 'Cats',
            }}
          />
          <Tab.Screen 
            name="Dogs" 
            component={DogsStack}
            options={{
              tabBarLabel: 'Dogs',
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
