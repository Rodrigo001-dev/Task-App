import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  function handleSubmit() {
    const alt = height / 100;
    const imc = weight / (alt * alt);
    
    if (imc < 18.6) {
      alert('Você está abaixo do peso!' + imc.toFixed(2));
    } else if (imc >= 18.6 && imc < 24.9) {
      alert('Peso ideal!' + imc.toFixed(2));
    } else if (imc >= 24.9 && imc < 34.9) {
      alert('Levemente acima do peso!' + imc.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcule seu IMC</Text>

      <TextInput 
        style={styles.input}
        value={weight}
        onChangeText={ (weight) => setWeight(weight)}
        placeholder="Peso (kg)"
        keyboardType="numeric"
      />

      <TextInput 
        style={styles.input}
        value={height}
        onChangeText={ (height) => setHeight(height) }
        placeholder="Altura (cm)"
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 30
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    margin: 15,
    padding: 10,
    color: '#FFF',
    fontSize: 23,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: "#41AEF4",
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 25,
  }
});
