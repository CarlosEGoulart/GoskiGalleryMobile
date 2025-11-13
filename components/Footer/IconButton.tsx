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
    color: string;
    active?: boolean;
} & TouchableOpacityProps;

export default function IconButton({ icon, text, active, color }: IconButtonProps) {
    const iconColor = active ? color : color;

    return (
        <TouchableOpacity style={styles.container}>
            {typeof icon === 'string' ? (
                <AntDesign name={icon as any} size={24} color={iconColor} />
            ) : (
                icon
            )}

            <Text style={[styles.text, { color: iconColor }]}>{text}</Text>
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
