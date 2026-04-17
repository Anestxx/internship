import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const venuesData = [
  {
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
  {
    id: 2,
    name: 'Smash Badminton Club',
    sport: 'Badminton',
    rating: 4.2,
    location: 'Noida',
    price: 500,
    image: '🏸',
    description: 'Indoor badminton courts with wooden flooring and professional equipment.',
    facilities: ['Indoor Courts', 'Equipment Rental', 'Cafeteria'],
  },
  {
    id: 3,
    name: 'Ace Tennis Courts',
    sport: 'Tennis',
    rating: 4.8,
    location: 'Gurgaon',
    price: 800,
    image: '🎾',
    description: 'Outdoor clay courts perfect for competitive tennis matches.',
    facilities: ['Clay Courts', 'Equipment Shop', 'Coaching Available'],
  },
  {
    id: 4,
    name: 'Basketball Central',
    sport: 'Basketball',
    rating: 4.3,
    location: 'Delhi',
    price: 1000,
    image: '🏀',
    description: 'Indoor basketball arena with professional courts and seating.',
    facilities: ['Indoor Arena', 'Seating', 'Equipment Rental'],
  },
  {
    id: 5,
    name: 'Volleyball Arena',
    sport: 'Volleyball',
    rating: 4.0,
    location: 'Noida',
    price: 600,
    image: '🏐',
    description: 'Beach volleyball courts with sand and recreational facilities.',
    facilities: ['Sand Courts', 'Beach Setting', 'Refreshments'],
  },
  {
    id: 6,
    name: 'Cricket Ground Pro',
    sport: 'Cricket',
    rating: 4.7,
    location: 'Faridabad',
    price: 1500,
    image: '🏏',
    description: 'Full-size cricket ground with pavilion and practice nets.',
    facilities: ['Full Ground', 'Pavilion', 'Practice Nets'],
  },
  {
    id: 7,
    name: 'SwimFit Pool',
    sport: 'Swimming',
    rating: 4.6,
    location: 'Delhi',
    price: 700,
    image: '🏊',
    description: 'Olympic-size swimming pool with training lanes and facilities.',
    facilities: ['Olympic Pool', 'Training Lanes', 'Locker Rooms'],
  },
  {
    id: 8,
    name: 'Golf Paradise',
    sport: 'Golf',
    rating: 4.9,
    location: 'Gurgaon',
    price: 2500,
    image: '⛳',
    description: '18-hole championship golf course with clubhouse and pro shop.',
    facilities: ['18 Holes', 'Clubhouse', 'Pro Shop'],
  },
];

export default function FavoritesScreen({ favorites, toggleFavorite, addBooking }) {
  const [notification, setNotification] = useState('');
  const favoriteVenues = venuesData.filter(venue => favorites.has(venue.id));

  const handleBooking = (venue) => {
    addBooking(venue);
    setNotification(`Booking successful for ${venue.name}`);
    setTimeout(() => setNotification(''), 2500);
    Alert.alert('✅ Booking Successful!', `Your booking for ${venue.name} has been confirmed.`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Ionicons key={i} name="star-outline" size={16} color="#FFD700" />);
    }
    return stars;
  };

  const renderVenue = ({ item }) => (
    <TouchableOpacity style={styles.venueCard} activeOpacity={0.9}>
      <View style={styles.cardHeader}>
        <View style={styles.venueImageContainer}>
          <Text style={styles.venueImage}>{item.image}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.favoriteButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="heart"
            size={28}
            color="#FF6B6B"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.venueInfo}>
        <Text style={styles.venueName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.venueDescription} numberOfLines={2}>{item.description}</Text>

        <View style={styles.venueDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.venueDetail}>{item.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="sports" size={18} color="#666" />
            <Text style={styles.venueDetail}>{item.sport}</Text>
          </View>
          <View style={styles.detailRow}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.facilitiesContainer}>
          {item.facilities.slice(0, 2).map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceAndBook}>
          <Text style={styles.priceText}>₹{item.price} per session</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => handleBooking(item)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.bookButtonGradient}
            >
              <Ionicons name="calendar" size={20} color="#fff" />
              <Text style={styles.bookButtonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#EE5A52']}
        style={styles.header}
      >
        <Text style={styles.title}>❤️ My Favorites</Text>
        <Text style={styles.subtitle}>{favoriteVenues.length} saved venues</Text>
        {notification ? (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        ) : null}
      </LinearGradient>

      {favoriteVenues.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on venues you like to save them here</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteVenues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVenue}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },
  notificationBanner: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  notificationText: {
    color: '#1B5E20',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  venueCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  venueImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueImage: {
    fontSize: 32,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ffebee',
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    lineHeight: 24,
  },
  venueDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  venueDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  venueDetail: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    fontWeight: '600',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  facilityTag: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  facilityText: {
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: '500',
  },
  priceAndBook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});