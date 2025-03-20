import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, semantic } from '../theme/colors';

const SkillsScreen = ({ onComplete, onSkip }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillCategories = [
    {
      category: 'Culinary Arts',
      skills: [
        { id: 1, name: 'Baking & Pastry', icon: 'cake-variant' },
        { id: 2, name: 'Traditional Cooking', icon: 'pot-steam' },
        { id: 3, name: 'Food Preservation', icon: 'food-variant' },
        { id: 4, name: 'Catering Business', icon: 'food-fork-drink' },
        { id: 5, name: 'International Cuisine', icon: 'earth' },
      ],
    },
    {
      category: 'Textile & Crafts',
      skills: [
        { id: 6, name: 'Tailoring', icon: 'scissors-cutting' },
        { id: 7, name: 'Embroidery', icon: 'needle' },
        { id: 8, name: 'Knitting', icon: 'yarn' },
        { id: 9, name: 'Fashion Design', icon: 'tshirt-crew' },
        { id: 10, name: 'Jewelry Making', icon: 'diamond-stone' },
      ],
    },
    {
      category: 'Home & Lifestyle',
      skills: [
        { id: 11, name: 'Interior Design', icon: 'home-variant' },
        { id: 12, name: 'Garden & Agriculture', icon: 'sprout' },
        { id: 13, name: 'Home Organization', icon: 'home-heart' },
        { id: 14, name: 'Event Planning', icon: 'calendar-star' },
        { id: 15, name: 'Beauty & Wellness', icon: 'spa' },
      ],
    },
    {
      category: 'Digital & Tech',
      skills: [
        { id: 16, name: 'Social Media', icon: 'instagram' },
        { id: 17, name: 'Basic Web Design', icon: 'web' },
        { id: 18, name: 'Digital Marketing', icon: 'trending-up' },
        { id: 19, name: 'Content Creation', icon: 'video' },
        { id: 20, name: 'Online Business', icon: 'shopping' },
      ],
    },
    {
      category: 'Education & Care',
      skills: [
        { id: 21, name: 'Teaching', icon: 'school' },
        { id: 22, name: 'Child Care', icon: 'baby-face' },
        { id: 23, name: 'Elder Care', icon: 'account-child' },
        { id: 24, name: 'Counseling', icon: 'heart-pulse' },
        { id: 25, name: 'Life Coaching', icon: 'lightbulb-on' },
      ],
    },
    {
      category: 'Professional Tech',
      skills: [
        { id: 26, name: 'Data Entry', icon: 'keyboard' },
        { id: 27, name: 'MS Office', icon: 'microsoft-office' },
        { id: 28, name: 'Email Management', icon: 'email' },
        { id: 29, name: 'Virtual Assistant', icon: 'desktop-mac' },
        { id: 30, name: 'Customer Service', icon: 'headset' },
      ],
    },
  ];

  const toggleSkill = (skillId) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skillId)) {
        return prevSkills.filter((id) => id !== skillId);
      } else {
        if (prevSkills.length >= 5) {
          Alert.alert('Maximum Skills', 'You can select up to 5 skills');
          return prevSkills;
        }
        return [...prevSkills, skillId];
      }
    });
  };

  const handleComplete = () => {
    if (selectedSkills.length === 0) {
      Alert.alert('Select Skills', 'Please select at least one skill');
      return;
    }
    const selectedSkillNames = selectedSkills.map((skillId) => {
      const skill = skillCategories
        .flatMap((category) => category.skills)
        .find((s) => s.id === skillId);
      return skill.name;
    });
    onComplete(selectedSkillNames);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={semantic.background.paper}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Icon name="star-circle" size={60} color={colors.primary.main} />
        <Text style={styles.title}>Select Your Skills</Text>
        <Text style={styles.subtitle}>
          Choose up to 5 skills that showcase your talents
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {skillCategories.map((category) => (
          <View key={category.category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View style={styles.skillsGrid}>
              {category.skills.map((skill) => (
                <TouchableOpacity
                  key={skill.id}
                  style={[
                    styles.skillButton,
                    selectedSkills.includes(skill.id) && styles.selectedSkill,
                  ]}
                  onPress={() => toggleSkill(skill.id)}>
                  <Icon
                    name={skill.icon}
                    size={24}
                    color={selectedSkills.includes(skill.id) ? semantic.text.inverse : semantic.text.secondary}
                  />
                  <Text
                    style={[
                      styles.skillText,
                      selectedSkills.includes(skill.id) && styles.selectedSkillText,
                    ]}>
                    {skill.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton]}
          onPress={handleComplete}>
          <Text style={styles.continueButtonText}>Continue</Text>
          <Icon name="arrow-right" size={20} color={semantic.text.inverse} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.paper,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: semantic.background.paper,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: semantic.text.primary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: semantic.text.secondary,
    textAlign: 'center',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: semantic.text.primary,
    marginBottom: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  skillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semantic.background.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    minWidth: '45%',
  },
  selectedSkill: {
    backgroundColor: colors.primary.main,
  },
  skillText: {
    marginLeft: 8,
    color: semantic.text.secondary,
    fontSize: 14,
  },
  selectedSkillText: {
    color: semantic.text.inverse,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    padding: 15,
  },
  skipButtonText: {
    color: semantic.text.secondary,
    fontSize: 16,
  },
  continueButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 20,
    borderRadius: 10,
  },
  continueButtonText: {
    color: semantic.text.inverse,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 10,
  },
});

export default SkillsScreen; 