import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import logo from '../../assets/logo.png'

export default function Login ({ navigation }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if(user) {
          navigation.navigate('Main', { user })
        }
      })
  }, [])

  async function handleLogin () {
    try {
      setIsEditable(false)
      const response = await api.post('/dev', { username })
      const { _id } = response.data
      await AsyncStorage.setItem('user', _id)
      navigation.navigate('Main', { _id })
      setError('')
    } catch (err) {
      setError('Usuário não possui conta no github')
    }
    setIsEditable(true)
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite o nome do seu usuário do Github"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        value={username}
        editable={isEditable}
        onChangeText={setUsername}
      />
      { error !== '' && <Text style={styles.errorMessage}>{error}</Text> }
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 30
  },
  input: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  button: {
    marginTop: 10,
    alignSelf: 'stretch',
    padding: 16,
    backgroundColor: '#DF4723',
    borderRadius: 5,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  errorMessage: {
    fontSize: 12,
    color: '#DF4723',
    marginBottom: 5,
    marginTop: 5
  }
})
