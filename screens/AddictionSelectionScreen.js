import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddictionSelectionScreen = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const handleSelect = (habit) => {
    setSelected(habit);
    setTimeout(() => {
      navigation.navigate('Home'); // Переход на главный экран
    }, 300); // Небольшая задержка для визуального эффекта
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите привычку:</Text>
      {['Алкоголь', 'Курение', 'Кофе', 'Сладкое', 'Соцсети'].map((habit) => (
        <TouchableOpacity
          key={habit}
          style={[styles.option, selected === habit && styles.selected]}
          onPress={() => handleSelect(habit)}
        >
          <Text style={[styles.optionText, selected === habit && styles.selectedText]}>
            {habit}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    width: '80%',
    marginVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3, // Тень для Android
  },
  selected: {
    backgroundColor: '#FF7854',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddictionSelectionScreen;
