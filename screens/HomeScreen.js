import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('');

  // Функция для запуска таймера
  const startSobrietyTimer = async () => {
    const now = Date.now(); // Текущее время в миллисекундах
    await AsyncStorage.setItem('sobrietyStartTime', now.toString()); // Сохраняем в AsyncStorage
    setStartTime(now);
    updateElapsedTime(); // Обновляем таймер сразу после старта
  };

  // Функция расчёта прошедшего времени
  const updateElapsedTime = () => {
    if (!startTime) return;
    const now = Date.now();
    const difference = now - startTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    setElapsedTime(`${days} дней, ${hours} часов, ${minutes} минут`);
  };

  // Загружаем сохранённое время при запуске
  useEffect(() => {
    const fetchStartTime = async () => {
      const storedTime = await AsyncStorage.getItem('sobrietyStartTime');
      if (storedTime) {
        setStartTime(parseInt(storedTime, 10));
      }
    };
    fetchStartTime();
  }, []);

  // Обновляем таймер каждую минуту
  useEffect(() => {
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главное меню</Text>

      <Text style={styles.timerText}>
        {startTime ? `Вы держитесь: ${elapsedTime}` : 'Нажмите "Начать", чтобы запустить счётчик'}
      </Text>

      {!startTime && (
        <TouchableOpacity style={styles.startButton} onPress={startSobrietyTimer}>
          <Text style={styles.startButtonText}>🚀 Начать отсчёт</Text>
        </TouchableOpacity>
      )}

      {/* Кнопки для других разделов */}
      <TouchableOpacity style={styles.button} onPress={() => alert("📊 Раздел статистики!")}>
        <Text style={styles.buttonText}>📊 Статистика</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert("💪 Раздел мотивации!")}>
        <Text style={styles.buttonText}>💪 Мотивация</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert("💬 Сообщество скоро здесь!")}>
        <Text style={styles.buttonText}>💬 Сообщество</Text>
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
  timerText: {
    fontSize: 18,
    marginVertical: 20,
    color: '#555',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    width: '80%',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF7854',
    padding: 15,
    width: '80%',
    marginVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
