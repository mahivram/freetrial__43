import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Platform,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors, semantic } from '../theme/colors';
import { generateResponse } from '../services/gemini';

const SaheliAi = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage);
      console.log('Saheli AI Response:', response);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      scrollToBottom();
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: `I apologize, but I encountered an error: ${error.message}. Please try again.`, 
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={semantic.text.primary} />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Saheli AI</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Chat Messages */}
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled">
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageWrapper,
              message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
            ]}>
            <View
              style={[
                styles.message,
                message.isUser ? styles.userMessage : styles.aiMessage,
                message.isError && styles.errorMessage,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                  message.isError && styles.errorMessageText,
                ]}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary.main} />
          </View>
        )}
      </KeyboardAwareScrollView>

      {/* Input Section */}
      <View style={[styles.inputContainer, { marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0 }]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor={semantic.text.secondary}
          multiline
          maxLength={500}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}>
          <Icon
            name="send"
            size={24}
            color={inputText.trim() ? colors.primary.main : semantic.text.disabled}
          />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: semantic.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: semantic.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: semantic.text.primary,
  },
  headerRight: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageWrapper: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: colors.primary.main,
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: semantic.background.paper,
    borderBottomLeftRadius: 4,
  },
  errorMessage: {
    backgroundColor: '#FEE2E2',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: semantic.text.primary,
  },
  errorMessageText: {
    color: '#DC2626',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: semantic.background.paper,
    borderTopWidth: 1,
    borderTopColor: semantic.border.light,
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    backgroundColor: semantic.background.default,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: semantic.border.light,
    color: semantic.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default SaheliAi;