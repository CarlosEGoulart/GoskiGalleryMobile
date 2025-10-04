// GoskiGallery/components/Header/SearchIcon.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchIcon({ onPress, searchActive }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={searchActive ? "close" : "search"} size={24} color={'white'} />
    </TouchableOpacity>
  );
}
