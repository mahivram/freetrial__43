import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, shadows, semantic, components } from '../theme/colors';

const CommunityScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('stories');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Mock data for stories/posts
  const posts = [
    {
      id: '1',
      author: 'Priya Singh',
      title: 'My Journey to Financial Independence',
      content: 'Started my small business three years ago, and today I employ 5 other women...',
      category: 'Success Story',
      likes: 128,
      comments: 45,
      timeAgo: '2h ago',
      avatar: 'https://picsum.photos/200',
      tags: ['Entrepreneurship', 'Women Empowerment'],
    },
    {
      id: '2',
      author: 'Meera Patel',
      title: 'Overcoming Challenges in Tech Industry',
      content: 'As a woman in tech, I faced many obstacles but perseverance paid off...',
      category: 'Career',
      likes: 89,
      comments: 32,
      timeAgo: '5h ago',
      avatar: 'https://picsum.photos/201',
      tags: ['Technology', 'Career Growth'],
    },
    {
      id: '3',
      author: 'Dr. Anjali Kumar',
      title: 'Mental Health Tips for Working Mothers',
      content: 'Balancing work and family can be challenging. Here are some strategies...',
      category: 'Mental Health',
      likes: 156,
      comments: 67,
      timeAgo: '1d ago',
      avatar: 'https://picsum.photos/202',
      tags: ['Mental Health', 'Work-Life Balance'],
    },
  ];

  // Mock data for categories
  const categories = [
    { id: '1', name: 'All', icon: 'view-grid' },
    { id: '2', name: 'Success Stories', icon: 'trophy' },
    { id: '3', name: 'Career', icon: 'briefcase' },
    { id: '4', name: 'Mental Health', icon: 'brain' },
    { id: '5', name: 'Relationships', icon: 'heart' },
    { id: '6', name: 'Safety', icon: 'shield-check' },
  ];

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.categoryBadge}>
          <Icon 
            name={categories.find(c => c.name === item.category)?.icon || 'tag'} 
            size={14} 
            color={colors.primary.main} 
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>{item.category}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={3}>
        {item.content}
      </Text>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="heart-outline" size={22} color={colors.primary.main} />
          <Text style={styles.footerButtonText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="comment-outline" size={22} color={colors.primary.main} />
          <Text style={styles.footerButtonText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="share-outline" size={22} color={colors.primary.main} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity 
          style={styles.newPostButton}
          onPress={() => setShowNewPostModal(true)}>
          <Icon name="plus" size={20} color={semantic.text.inverse} />
          <Text style={styles.newPostButtonText}>Share Story</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                activeTab === category.name.toLowerCase() && styles.activeCategoryChip,
              ]}>
              <Icon 
                name={category.icon} 
                size={20} 
                color={activeTab === category.name.toLowerCase() ? semantic.text.inverse : colors.primary.main} 
              />
              <Text
                style={[
                  styles.categoryChipText,
                  activeTab === category.name.toLowerCase() && styles.activeCategoryChipText,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Stories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={semantic.background.paper}
        barStyle="dark-content"
      />
      
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
        ListHeaderComponent={renderHeader}
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowNewPostModal(true)}>
        <Icon name="plus" size={24} color={semantic.text.inverse} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: semantic.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.light,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: semantic.text.primary,
    letterSpacing: 0.5,
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    
  },
  newPostButtonText: {
    color: semantic.text.inverse,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  categoriesWrapper: {
    backgroundColor: semantic.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.light,
    ...shadows.sm,
  },
  categoriesContainer: {
    backgroundColor: semantic.background.paper,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    
  },
  activeCategoryChip: {
    backgroundColor: colors.primary.main,
  },
  categoryChipText: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeCategoryChipText: {
    color: semantic.text.inverse,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: semantic.text.primary,
    letterSpacing: 0.5,
  },
  seeAllButton: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
  },
  postsList: {
    paddingBottom: 90,
  },
  postCard: {
    backgroundColor: semantic.background.paper,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: semantic.text.primary,
    marginBottom: 2,
  },
  timeAgo: {
    fontSize: 12,
    color: semantic.text.secondary,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryText: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: semantic.text.primary,
    marginBottom: 8,
    lineHeight: 24,
  },
  postContent: {
    fontSize: 14,
    color: semantic.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: semantic.background.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: semantic.text.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: semantic.border.light,
    paddingTop: 12,
    marginTop: 4,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  footerButtonText: {
    marginLeft: 6,
    color: semantic.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },
});

export default CommunityScreen; 