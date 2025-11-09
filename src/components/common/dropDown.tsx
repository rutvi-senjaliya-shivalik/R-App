import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatListProps,
  Keyboard,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, FS, FF } from '../../constants';

type Item = { label: string; value: string };

type Props = {
  data: Item[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onFocus?: () => void; // callback for when dropdown is focused/opened
  error?: string;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  estimatedItemHeight?: number; // default 46
  maxHeight?: number; // default 300
  search?: boolean; // enable search functionality
  searchPlaceholder?: string; // placeholder for search input
  onChangeText?: (text: string) => void; // callback for search text changes
  key?: string; // optional key prop
  flatListProps?: Partial<FlatListProps<Item>>; // optional flatListProps prop
};

const Dropdowns = ({
  data = [],
  value,
  placeholder,
  onChange,
  onFocus,
  error,
  dropdownStyle,
  placeholderStyle,
  selectedTextStyle,
  estimatedItemHeight = 46,
  maxHeight = 300,
  search = false,
  searchPlaceholder = "Search...",
  onChangeText,
  key,
  flatListProps
}: Props) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const containerRef = useRef<View>(null);
  const windowHeight = Dimensions.get('window').height;

  const decidePosition = useCallback(() => {
    if (!containerRef.current) return;
    // measure in screen coordinates
    containerRef.current.measureInWindow((_x, y, _w, h) => {
      const spaceAbove = y;
      const spaceBelow = windowHeight - (y + h);

      // estimate how much space the menu needs
      const estimatedMenuHeight = Math.min(
        maxHeight,
        Math.max(estimatedItemHeight * data.length, estimatedItemHeight * 4) // show at least a few rows
      );

      // choose where it fits best
      if (spaceBelow >= estimatedMenuHeight || spaceBelow >= spaceAbove) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    });
  }, [data.length, estimatedItemHeight, maxHeight, windowHeight]);

  useEffect(() => {
    // recalc on orientation or keyboard changes
    const dimSub = Dimensions.addEventListener('change', decidePosition);
    const k1 = Keyboard.addListener('keyboardDidShow', decidePosition);
    const k2 = Keyboard.addListener('keyboardDidHide', decidePosition);
    return () => {
      dimSub?.remove?.();
      k1.remove();
      k2.remove();
    };
  }, [decidePosition]);

  return (
    <View
      ref={containerRef}
      style={styles.wrapper}
      onLayout={() => {
        // give layout a tick to settle then measure
        requestAnimationFrame(decidePosition);
      }}
    >
      <Dropdown
        key={key}
        style={[styles.dropdown,{zIndex:999999}, dropdownStyle, error ? styles.dropdownError : null]}
        placeholderStyle={[styles.dropdownPlaceholder, placeholderStyle,{zIndex:999999}]}
        selectedTextStyle={[styles.dropdownSelectedText, selectedTextStyle,{zIndex:999999}]}
        data={data}
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          decidePosition();
          onFocus?.();
        }}
        onChange={item => onChange(item.value)}
        dropdownPosition={position} // <-- auto top/bottom
        itemTextStyle={{ 
          color: COLORS.BLACK_TEXT,
          fontSize: FS.FS14,
          fontFamily: FF[400],
        }}
        containerStyle={{ 
          backgroundColor: COLORS.WHITE,
          borderColor: COLORS.BORDER_GREY,
          borderWidth: 1,
          borderRadius: 8,
          zIndex: 999999,
        }}
        backgroundColor="transparent"
        search={search}
        searchPlaceholder={searchPlaceholder}
        onChangeText={onChangeText}
        flatListProps={flatListProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // helps the dropdown overlay draw above neighbors
    zIndex: 10, // iOS
    elevation: 10, // Android
  },
  dropdown: {
    height: 50,
    borderColor: COLORS.BORDER_GREY,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 0,
    backgroundColor: COLORS.LIGHT_GRAY,
    zIndex:999999
  },
  dropdownError: {
    borderColor: COLORS.ERROR_COLOR,
  },
  dropdownPlaceholder: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  dropdownSelectedText: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
  },
});

export default Dropdowns;
