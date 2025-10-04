// GoskiGallery/components/Header/index.tsx
import { View, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import theme from '@/constants/theme';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';

export default function Header({ searchQuery, setSearchQuery }) {
  const [searchActive, setSearchActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchQuery('');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Logo />
        <View style={styles.icons}>
          <SearchIcon onPress={toggleSearch} searchActive={searchActive} />
          <MenuIcon />
        </View>
      </View>
      {searchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar artes..."
          placeholderTextColor={'grey'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
    </View>
  );
}

// Adicione este estilo ao seu StyleSheet
const styles = StyleSheet.create({
  // ...seus estilos container e icons
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.dimension.xs,
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: theme.dimension.xs,
    marginHorizontal: theme.dimension.xs,
    marginBottom: theme.dimension.xs,
    color: 'white',
  },
});
