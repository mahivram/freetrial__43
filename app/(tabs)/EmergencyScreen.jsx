import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, shadows, semantic, components } from '../theme/colors';

const EmergencyScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const emergencyContacts = [
    { id: '1', name: 'Police', number: '100', icon: 'police-badge' },
    { id: '2', name: 'Ambulance', number: '102', icon: 'ambulance' },
    { id: '3', name: 'Fire', number: '101', icon: 'fire-truck' },
    { id: '4', name: 'National Emergency', number: '112', icon: 'alert-circle' },
    { id: '5', name: 'Child Helpline', number: '1098', icon: 'human-baby-changing-table' },
  ];

  const womensHelplines = [
    { id: '1', name: 'Women Helpline (National)', number: '1091', icon: 'human-female' },
    { id: '2', name: 'Domestic Violence Helpline', number: '181', icon: 'home-alert' },
    { id: '3', name: 'Childline (For girls under 18)', number: '1098', icon: 'human-female-girl' },
    { id: '4', name: 'Mental Health Helpline', number: '1860-266-2345', icon: 'brain' },
    { id: '5', name: 'Mental Health WhatsApp', number: '+91 9999 666 555', icon: 'whatsapp' },
    { id: '6', name: 'Arogyavani Health Helpline', number: '104', icon: 'medical-bag' },
    { id: '7', name: 'Cyber Crime Helpline', number: '1930', icon: 'shield-lock' },
    { id: '8', name: 'Legal Aid Helpline (NALSA)', number: '15100', icon: 'scale-balance' },
  ];

  const quickActions = [
    {
      id: '1',
      title: 'Share Location',
      icon: 'map-marker-radius',
      color: '#4F46E5',
      action: () => handleShareLocation(),
    },
    {
      id: '2',
      title: 'Record Audio',
      icon: 'record-circle',
      color: '#EF4444',
      action: () => handleRecordAudio(),
    },
    {
      id: '3',
      title: 'Emergency SMS',
      icon: 'message-alert',
      color: '#F59E0B',
      action: () => handleEmergencySMS(),
    },
    {
      id: '4',
      title: 'Emergency Contacts',
      icon: 'contacts',
      color: '#10B981',
      action: () => setExpandedSection('contacts'),
    },
  ];

  const safetyTips = [
    {
      id: '1',
      title: 'Stay Calm',
      description: 'Take deep breaths and try to remain calm in emergency situations.',
      icon: 'heart-pulse',
    },
    {
      id: '2',
      title: 'Seek Safe Location',
      description: 'Move to a safe place if you feel threatened or unsafe.',
      icon: 'shield-home',
    },
    {
      id: '3',
      title: 'Alert Authorities',
      description: 'Contact emergency services immediately if needed.',
      icon: 'phone-alert',
    },
    {
      id: '4',
      title: 'Share Location',
      description: 'Share your location with trusted contacts.',
      icon: 'map-marker-alert',
    },
  ];

  const handleCall = (number) => {
    const phoneNumber = Platform.select({ ios: `telprompt:${number}`, android: `tel:${number}` });
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const handleShareLocation = () => {
    Alert.alert(
      'Share Location',
      'This will share your current location with emergency contacts',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Share location') },
      ]
    );
  };

  const handleRecordAudio = () => {
    Alert.alert(
      'Record Audio',
      'This will start recording audio for emergency purposes',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Recording', onPress: () => console.log('Start recording') },
      ]
    );
  };

  const handleEmergencySMS = () => {
    Alert.alert(
      'Emergency SMS',
      'This will send an emergency SMS to your contacts',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => console.log('Send emergency SMS') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={semantic.background.paper}
        barStyle="dark-content"
      />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Assistance</Text>
        <Text style={styles.headerSubtitle}>Get immediate help in emergency situations</Text>
      </View>

      {/* SOS Button */}
      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => handleCall('112')}>
        <View style={styles.sosInner}>
          <Icon name="phone-alert" size={40} color="#FFFFFF" />
          <Text style={styles.sosText}>SOS</Text>
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={action.action}>
              <Icon name={action.icon} size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.contactsContainer}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => handleCall(contact.number)}>
              <View style={styles.contactIcon}>
                <Icon name={contact.icon} size={24} color="#4F46E5" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Icon name="phone" size={20} color="#4F46E5" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Women's Helplines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Women's Helplines</Text>
        <View style={styles.contactsContainer}>
          {womensHelplines.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={[styles.contactCard, styles.womensHelplineCard]}
              onPress={() => handleCall(contact.number)}>
              <View style={[styles.contactIcon, styles.womensHelplineIcon]}>
                <Icon name={contact.icon} size={24} color="#D946EF" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Icon name="phone" size={20} color="#D946EF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Safety Tips */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
        <View style={styles.tipsContainer}>
          {safetyTips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Icon name={tip.icon} size={24} color="#4F46E5" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.default,
  },
  header: {
    padding: 20,
    backgroundColor: semantic.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.light,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: semantic.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: semantic.text.secondary,
  },
  sosButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  sosInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.status.error,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
    shadowColor: colors.common.white,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  sosText: {
    color: semantic.text.inverse,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    padding: 20,
    backgroundColor: semantic.background.paper,
    marginBottom: 12,
  },
  lastSection: {
    marginBottom: 100, // Extra padding for bottom navigation
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: semantic.text.primary,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  actionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    ...shadows.sm,
  },
  actionText: {
    color: semantic.text.inverse,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  contactsContainer: {
    marginTop: 8,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: semantic.background.paper,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: semantic.border.light,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: semantic.text.primary,
  },
  contactNumber: {
    fontSize: 14,
    color: semantic.text.secondary,
    marginTop: 2,
  },
  tipsContainer: {
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: semantic.background.paper,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: semantic.border.light,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: semantic.text.primary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: semantic.text.secondary,
    lineHeight: 20,
  },
  womensHelplineCard: {
    borderColor: '#D946EF20',
    borderWidth: 1,
    backgroundColor: '#FCF5FF',
  },
  womensHelplineIcon: {
    backgroundColor: '#F5D0FE',
  },
});

export default EmergencyScreen; 