import React, { memo } from 'react';
import { View, Image, TextInput } from 'react-native';
import { SearchInputStyles } from './styles';
import { COLORS, IMAGES } from '../../constants';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const SearchInput = memo<SearchInputProps>(
  ({ value, onChangeText, placeholder }) => {
    return (
      <View style={SearchInputStyles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={SearchInputStyles.searchInput}
          placeholderTextColor={COLORS.GREY_TEXT}
        />
        <Image source={IMAGES.SEARCH} style={SearchInputStyles.searchIcon} />
        {/* <Text>SearchInput</Text> */}
      </View>
    );
  },
);

export default SearchInput;
