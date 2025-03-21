import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors, semantic } from '../theme/colors';

const AIAssistant = () => {
  return (
    <>
      <StatusBar
        backgroundColor={semantic.background.paper}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Link href="../" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Icon name="arrow-left" size={24} color={semantic.text.primary} />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>AI Assistant</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeSection}>
            <View style={styles.iconContainer}>
              <Icon name="robot" size={48} color={colors.primary.main} />
            </View>
            <Text style={styles.welcomeTitle}>How can I help you today?</Text>
            <Text style={styles.welcomeDescription}>
              I'm your personal AI assistant. I can help you with financial advice,
              career guidance, and more.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Type your question here..."
              placeholderTextColor={semantic.text.secondary}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Icon name="send" size={24} color={colors.common.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    backgroundColor: semantic.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: semantic.text.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    flexGrow: 1,
  },
  welcomeSection: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.primary.main}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: `${colors.primary.main}30`,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: semantic.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    color: semantic.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 'auto',
    paddingTop: 20,
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: semantic.background.default,
  },
  input: {
    flex: 1,
    minHeight: 56,
    maxHeight: 120,
    backgroundColor: semantic.background.paper,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingRight: 56,
    fontSize: 16,
    color: semantic.text.primary,
    borderWidth: 1,
    borderColor: colors.gray[200],
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sendButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default AIAssistant;