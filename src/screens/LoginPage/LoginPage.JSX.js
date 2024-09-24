import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const API_URL = 'http://http://5000/api';
export const storage = new MMKV();

const LoginPage = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const endpoint = isLogin ? '/login' : '/register';
        const body = isLogin ? { email, password } : { username, email, password };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                storage.set('userToken', data.token);
                Alert.alert('Success', `${isLogin ? 'Login' : 'Registration'} successful!`);
                navigation.navigate('Home')
            } else {
                Alert.alert('Error', data.message || 'An error occurred');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MyShop</Text>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#34db3c',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#34db4a',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    switchText: {
        marginTop: 20,
        color: '#34db5e',
        fontSize: 16,
    },
});

export default LoginPage;
