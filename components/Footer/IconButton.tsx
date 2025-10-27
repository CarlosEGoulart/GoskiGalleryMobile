import {
    Text,
    TouchableOpacityProps,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

type IconButtonProps = {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
} & TouchableOpacityProps;

export default function IconButton({ icon, text, active }: IconButtonProps) {
    const color = active ? 'white' : 'grey';

    return (
        <TouchableOpacity style={styles.container}>
            {typeof icon === 'string' ? (
                <AntDesign name={icon as any} size={24} color={color} />
            ) : (
                icon
            )}

            <Text style={[styles.text, { color }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
    },
});
