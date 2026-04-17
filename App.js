import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import BookingsScreen from './BookingsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState(new Set([1, 3, 6])); // Pre-populate some favorites
  const [bookings, setBookings] = useState([
    {
      id: '1',
      venue: {
        id: 1,
        name: 'Elite Turf Arena',
        sport: 'Football',
        rating: 4.5,
        location: 'Delhi',
        price: 1200,
        image: '🏟️',
        description: 'Professional football field with natural grass and floodlights.',
        facilities: ['Changing Rooms', 'Parking', 'Floodlights'],
      },
      date: '2026-04-20',
      time: '10:00 AM',
    },
  ]);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addBooking = (venue) => {
    const newBooking = {
      id: Date.now().toString(),
      venue,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              bookings={bookings}
              addBooking={addBooking}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addBooking={addBooking}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Bookings">
          {(props) => (
            <BookingsScreen
              {...props}
              bookings={bookings}
              cancelBooking={cancelBooking}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              user={user}
              updateUser={updateUser}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
