import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors, semantic } from '../theme/colors';

const DashboardScreen = ({ userSkills = [], navigation }) => {
  const mainCategories = [
    {
      id: '1',
      title: 'Financial Education',
      description: 'Learn smart money management',
      icon: 'school',
      color: '#4F46E5',
      bgColor: '#EEF2FF',
      screen: 'FinancialEducationScreen',
    },
    {
      id: '2',
      title: 'Financial Tools',
      description: 'Budget planning & tracking',
      icon: 'calculator',
      color: '#2563EB',
      bgColor: '#DBEAFE',
      screen: 'BudgetToolsScreen',
    },
    {
      id: '3',
      title: 'Self Care',
      description: 'Mental & physical wellness tips',
      icon: 'heart-pulse',
      color: '#059669',
      bgColor: '#ECFDF5',
      screen: 'SelfCareScreen',
    },
    {
      id: '4',
      title: 'Jobs',
      description: 'Learn new skills and enhance your capabilities',
      icon: 'lightbulb-on',
      color: '#9333EA',
      bgColor: '#F3E8FF',
      screen: 'JobsScreen',
    },
  ];

  const renderCategoryCard = ({ item }) => (
    <Link href={`/(screens)/${item.screen}`} asChild>
      <TouchableOpacity 
        style={StyleSheet.flatten([styles.categoryCard, { backgroundColor: item.bgColor }])}
        activeOpacity={0.7}>
        <View style={StyleSheet.flatten([styles.categoryIconContainer, { backgroundColor: item.color + '20' }])}>
          <Icon name={item.icon} size={32} color={item.color} />
        </View>
        <Text style={StyleSheet.flatten([styles.categoryTitle, { color: item.color }])}>{item.title}</Text>
        <Text style={styles.categoryDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.categoryArrow}>
          <Icon name="arrow-right" size={20} color={item.color} />
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <StatusBar
        backgroundColor={semantic.background.paper}
        barStyle="dark-content"
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('profile')}>
            <Icon name="account-circle" size={40} color={colors.primary.main} />
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {mainCategories.map((category) => (
            <View key={category.id} style={styles.categoryWrapper}>
              {renderCategoryCard({ item: category })}
            </View>
          ))}
        </View>

        {/* Government Schemes Button */}
        <View style={styles.additionalResourcesContainer}>
          <TouchableOpacity 
            style={styles.schemesButton}
            onPress={() => navigation.navigate('schemes')}
            activeOpacity={0.7}>
            <View style={styles.schemesContent}>
              <View style={styles.schemesIconContainer}>
                <Icon name="bank" size={32} color="#7C3AED" />
              </View>
              <View style={styles.schemesTextContainer}>
                <Text style={styles.schemesTitle}>Government Schemes</Text>
                <Text style={styles.schemesDescription}>
                  Access government schemes & benefits
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#7C3AED" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.default,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: semantic.background.paper,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: semantic.text.primary,
  },
  dateText: {
    fontSize: 14,
    color: semantic.text.secondary,
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    width: '48%',

    marginBottom: 21,
  },
  categoryCard: {
    
    width: '96%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 180,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 13,
    color: semantic.text.secondary,
    lineHeight: 18,
  },
  categoryArrow: {
    position: 'absolute',
    bottom: 9,
    right: 15,
  },
  additionalResourcesContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  schemesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F3FF',
    borderRadius: 16,
    padding: 16,
  },
  schemesContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schemesIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  schemesTextContainer: {
    flex: 1,
  },
  schemesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5B21B6',
    marginBottom: 4,
  },
  schemesDescription: {
    fontSize: 14,
    color: '#7C3AED',
  },
});

export default DashboardScreen; 