import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import IconButton from "./IconButton";


export default function Footer() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <IconButton text="" icon="home" />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <IconButton text="" icon="picture" />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <IconButton text="" icon="person" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
});