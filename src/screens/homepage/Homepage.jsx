import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const API_URL = 'http://http://5000/api/products'
const storage = new MMKV();

const HomePage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = storage.getString('userToken');
      if (!token) {
        Alert.alert('Error', 'Please login to view products');
        navigation.navigate('Login')
        return;
      }

      const response = await fetch(`${API_URL}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      const enhancedProducts = data.map(product => ({
        ...product,
        price: Math.floor(Math.random() * 100) + 1,
        image: `https://picsum.photos/200/300?random=${product._id}`, // Serverde productlari goturmekde problem oldu deye frontda Dummy productlar gosterilir
      }));
      setProducts(enhancedProducts);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
      <TouchableOpacity style={styles.productCard} onPress={() => Alert.alert('Product Details', `You selected ${item.title}`)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
  );

  if (loading) {
    return (
        <View style={styles.centered}>
          <Text>Loading products...</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Our Store</Text>
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item._id}
            numColumns={2}
            contentContainerStyle={styles.productList}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default HomePage;
