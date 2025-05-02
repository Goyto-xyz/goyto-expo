// app/messages/_modal.tsx

import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

const mockMessages = [
  { id: '1', sender: 'Ken', content: 'Hey, how are you?' },
  { id: '2', sender: 'Mary', content: 'Are we still on for tonight?' },
  { id: '3', sender: 'Charlie', content: 'Don’t forget the meeting at 3PM.' },
];

const MessagesModal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={mockMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MessagesModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    marginBottom: 15,
  },
  sender: {
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
});
