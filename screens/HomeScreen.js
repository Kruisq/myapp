import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

// Разрешаем отправку уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('');
  const navigation = useNavigation();

  // Функция для запроса разрешения на уведомления
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  // Функция для запуска таймера
  const startSobrietyTimer = async () => {
    const now = Date.now();
    await AsyncStorage.setItem('sobrietyStartTime', now.toString());
    setStartTime(now);
    await requestNotificationPermission();
    scheduleDailyNotification();
  };

  // Функция расчёта прошедшего времени
  const updateElapsedTime = () => {
    if (!startTime) return;
    const now = Date.now();
    const difference = now - startTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    setElapsedTime(`${days} дней`);
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

  // Функция для отправки ежедневного напоминания
  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Ты держишься!",
        body: "Еще один день без вредной привычки! Продолжай в том же духе! 💪",
      },
      trigger: { hour: 10, minute: 0, repeats: true }, // Уведомление каждый день в 10:00
    });
  };

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

      {/* Кнопки для перехода на экраны */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Stats')}>
        <Text style={styles.buttonText}>📊 Статистика</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Motivation')}>
        <Text style={styles.buttonText}>💪 Мотивация</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Community')}>
        <Text style={styles.buttonText}>💬 Сообщество</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.creat
