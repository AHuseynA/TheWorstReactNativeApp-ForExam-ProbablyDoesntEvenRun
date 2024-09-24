import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const BasketPage = ({ navigation }) => {
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        loadBasketItems();
    }, []);

    const loadBasketItems = () => {
        const items = JSON.parse(storage.getString('basket') || '[]');
        setBasketItems(items);
    };

    const removeFromBasket = (index) => {
        const updatedBasket = basketItems.filter((_, i) => i !== index);
        storage.set('basket', JSON.stringify(updatedBasket));
        setBasketItems(updatedBasket);
    };

    const calculateTotal = () => {
        return basketItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const renderBasketItem = ({ item, index }) => (
        <View style={styles.basketItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromBasket(index)}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Basket</Text>
            {basketItems.length === 0 ? (
                <Text style={styles.emptyBasket}>Your basket is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={basketItems}
                        renderItem={renderBasketItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => Alert.alert('Checkout', 'Proceed to payment')}
                        >
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    basketItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyBasket: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    totalContainer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#bdc3c7',
        paddingTop: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BasketPage;
