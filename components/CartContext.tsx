"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, delta: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('curvychiq-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Basic migration/validation: filter out items without color if needed, or default them
                // For now, we'll just load them. If color is missing, it might break UI, so let's default to "N/A" if missing
                const migratedCart = parsedCart.map((item: any) => ({
                    ...item,
                    color: item.color || "N/A"
                }));
                setItems(migratedCart);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('curvychiq-cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((currentItems) => {
            // Find item with same ID AND same size AND same color
            const existingItem = currentItems.find((item) =>
                item.id === newItem.id &&
                item.size === newItem.size &&
                item.color === newItem.color
            );
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, size: string, color: string) => {
        setItems((currentItems) => currentItems.filter((item) => !(item.id === id && item.size === size && item.color === color)));
    };

    const updateQuantity = (id: string, size: string, color: string, delta: number) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id === id && item.size === size && item.color === color) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
