import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingsScreen({ bookings, cancelBooking }) {
  const [notification, setNotification] = useState('');

  const doCancel = (booking) => {
    cancelBooking(booking.id);
    setNotification(`Booking cancelled for ${booking.venue.name}`);
    setTimeout(() => setNotification(''), 2500);
    Alert.alert('✅ Booking Cancelled', `Your booking for ${booking.venue.name} has been cancelled successfully.`);
  };

  const handleCancel = (booking) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Cancel booking for ${booking.venue.name}?`);
      if (confirmed) {
        doCancel(booking);
      }
      return;
    }

    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for ${booking.venue.name}?`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => doCancel(booking),
        },
      ]
    );
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

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.venueImageContainer}>
          <Text style={styles.venueImage}>{item.venue.image}</Text>
        </View>
        <View style={styles.bookingStatus}>
          <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>

      <View style={styles.bookingInfo}>
        <Text style={styles.venueName} numberOfLines={2}>{item.venue.name}</Text>
        <Text style={styles.venueDescription} numberOfLines={2}>{item.venue.description}</Text>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{item.venue.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="sports" size={18} color="#666" />
            <Text style={styles.detailText}>{item.venue.sport}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            {renderStars(item.venue.rating)}
            <Text style={styles.ratingText}>{item.venue.rating}</Text>
          </View>
        </View>

        <View style={styles.facilitiesContainer}>
          {item.venue.facilities && item.venue.facilities.slice(0, 2).map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.priceText}>₹{item.venue.price}</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#45a049']}
        style={styles.header}
      >
        <Text style={styles.title}>📅 My Bookings</Text>
        <Text style={styles.subtitle}>{bookings.length} active bookings</Text>
        {notification ? (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        ) : null}
      </LinearGradient>

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Book your favorite sports venues to see them here</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBooking}
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
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  venueImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueImage: {
    fontSize: 32,
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  bookingInfo: {
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
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
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
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  facilityText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '500',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
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