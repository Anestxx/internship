import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, ScrollView, RefreshControl } from 'react-native';
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

const sports = ['All', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Volleyball', 'Cricket', 'Swimming', 'Golf'];

export default function HomeScreen({ favorites, toggleFavorite, bookings, addBooking }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('none');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState('');

  const filteredAndSortedVenues = useMemo(() => {
    let filtered = venuesData.filter(venue => {
      const matchesFilter = filter === 'All' || venue.sport === filter;
      const matchesSearch = venue.name.toLowerCase().includes(search.toLowerCase()) ||
                           venue.sport.toLowerCase().includes(search.toLowerCase()) ||
                           venue.location.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (sort === 'priceLow') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'ratingHigh') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [filter, sort, search]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

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
            name={favorites.has(item.id) ? "heart" : "heart-outline"}
            size={28}
            color={favorites.has(item.id) ? "#FF6B6B" : "#999"}
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
        colors={['#4A90E2', '#357ABD']}
        style={styles.header}
      >
        <Text style={styles.title}>🏟️ Sports Venues</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, sports, locations..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
          />
        </View>
        {notification ? (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        ) : null}
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {sports.map(sport => (
          <TouchableOpacity
            key={sport}
            style={[styles.filterButton, filter === sport && styles.activeFilterButton]}
            onPress={() => setFilter(sport)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterButtonText, filter === sport && styles.activeFilterButtonText]}>
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sort === 'none' && styles.activeSortButton]}
          onPress={() => setSort('none')}
          activeOpacity={0.7}
        >
          <Text style={[styles.sortButtonText, sort === 'none' && styles.activeSortButtonText]}>Default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sort === 'priceLow' && styles.activeSortButton]}
          onPress={() => setSort('priceLow')}
          activeOpacity={0.7}
        >
          <Ionicons name="trending-down" size={18} color={sort === 'priceLow' ? '#fff' : '#666'} />
          <Text style={[styles.sortButtonText, sort === 'priceLow' && styles.activeSortButtonText]}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sort === 'ratingHigh' && styles.activeSortButton]}
          onPress={() => setSort('ratingHigh')}
          activeOpacity={0.7}
        >
          <Ionicons name="star" size={18} color={sort === 'ratingHigh' ? '#fff' : '#666'} />
          <Text style={[styles.sortButtonText, sort === 'ratingHigh' && styles.activeSortButtonText]}>Rating</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAndSortedVenues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenue}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={80} color="#ddd" />
            <Text style={styles.emptyText}>No venues found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
  filterContainer: {
    maxHeight: 60,
    paddingVertical: 10,
  },
  filterContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 80,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#4A90E2',
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 90,
    justifyContent: 'center',
  },
  activeSortButton: {
    backgroundColor: '#4A90E2',
  },
  sortButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginLeft: 6,
  },
  activeSortButtonText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
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
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueImage: {
    fontSize: 32,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  facilityText: {
    fontSize: 12,
    color: '#1976d2',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});