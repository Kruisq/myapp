import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Сообщество</Text>
      <Text style={styles.info}>Скоро здесь появится чат поддержки! 🚀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
    textAlign: 'center',
  },
});

export default CommunityScreen;
