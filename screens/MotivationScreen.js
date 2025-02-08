import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const quotes = [
  "Каждый день без вредной привычки — это победа! 🏆",
  "Ты сильнее, чем ты думаешь! 💪",
  "Продолжай, и ты увидишь, как жизнь становится лучше! 🌟",
  "Здоровье и свобода — это то, что ты заслуживаешь! ❤️",
  "Твой прогресс вдохновляет других! 🚀"
];

const MotivationScreen = () => {
  const [quote, setQuote] = useState(quotes[0]);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💪 Мотивация</Text>
      <Text style={styles.quote}>{quote}</Text>
      <TouchableOpacity style={styles.button} onPress={getNewQuote}>
        <Text style={styles.buttonText}>🔄 Новая цитата</Text>
      </TouchableOpacity>
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
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7854',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MotivationScreen;
