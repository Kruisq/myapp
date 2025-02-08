import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const habitCosts = {
  'Алкоголь': 300,
  'Курение': 200,
  'Кофе': 150,
  'Сладкое': 100,
  'Соцсети': 0,
};

const StatsScreen = () => {
  const [elapsedTime, setElapsedTime] = useState('');
  const [moneySaved, setMoneySaved] = useState(0);
  const [selectedHabit, setSelectedHabit] = useState('');

  useEffect(() => {
    const fetchStoredData = async () => {
      const storedTime = await AsyncStorage.getItem('sobrietyStartTime');
      const storedHabit = await AsyncStorage.getItem('selectedHabit');

      if (storedTime) {
        const startTime = parseInt(storedTime, 10);
        const now = Date.now();
        const days = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));

        setElapsedTime(`${days} дней`);
        if (storedHabit) {
          setSelectedHabit(storedHabit);
          setMoneySaved(days * (habitCosts[storedHabit] || 0));
        }
      }
    };

    fetchStoredData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Статистика</Text>
      <Text style={styles.info}>Вы не употребляете: {selectedHabit}</Text>
      <Text style={styles.info}>⏳ Держитесь уже: {elapsedTime}</Text>
      <Text style={styles.moneySaved}>💰 Сэкономлено: {moneySaved.toLocaleString()} ₽</Text>
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
  },
  moneySaved: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default StatsScreen;
