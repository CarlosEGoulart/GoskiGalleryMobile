import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from '@/constants/theme';

export default function SearchIcon() {
    const [Search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const input = useRef<TextInput>(null);

    const handleSearch= ( ) => {
        setShowSearch(currentShow => !currentShow);
        if (showSearch) {
            setSearch('');
        }
    };

    useEffect(() => {
        if (showSearch) {
            input.current?.focus();
        }
    }, [showSearch]);

    
    return (
        <View style={styles.container}>
            {showSearch && (
                <TextInput
                    ref={input}
                    style={styles.input}
                    placeholder="Pesquisar..."
                    placeholderTextColor="grey"
                    value={Search}
                    onChangeText={setSearch}
                />
            )}
            <TouchableOpacity onPress={handleSearch}>
                <AntDesign name={showSearch ? "close" : "search"} size={24} color={'white'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.dimension.sm,
    },
    input: {
        color: 'white',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.light,
        width: 150,
    }
});