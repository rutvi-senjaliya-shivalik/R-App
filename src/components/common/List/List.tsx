import React, {
  ComponentType,
  ForwardedRef,
  forwardRef,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
  RefreshControlProps,
} from 'react-native';
import {listStyles} from './styles';
import {isFunction, noop} from 'lodash';
import {Divider} from '../Divider';

export type ListComponentT =
  | React.ComponentType<any>
  | React.ReactElement
  | null;

export interface ListProps<ItemT> {
  items: ItemT[];
  renderRow: (item: ItemT, index: number) => ReactNode;
  keyExtractor?: (item: ItemT) => string;
  bounces?: boolean;
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;
  headerComponent?: ListComponentT;
  bottomComponent?: ListComponentT;
  DividerComponent?: ListComponentT;
  showTopDivider?: boolean;
  showBottomDivider?: boolean;
  keyboardDismissMode?: ScrollViewProps['keyboardDismissMode'];
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listEmptyComponent?: ListComponentT;
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null;
  onLayout?: () => void;
  onContentSizeChange?: (width: number, height: number) => void;
  refreshControl?: React.ReactElement<
    RefreshControlProps,
    string | React.JSXElementConstructor<any>
  >;
  testID?: string;
  ListFooterComponentStyle?: StyleProp<ViewStyle>;
  scrollEventThrottle?: number;
  onEndReachedThreshold?: number | null;
}

export const ListComponent = <T,>(
  {
    items,
    renderRow,
    keyExtractor,
    bounces,
    alwaysBounceVertical,
    alwaysBounceHorizontal,
    headerComponent,
    bottomComponent,
    DividerComponent,
    showTopDivider = true,
    showBottomDivider = true,
    keyboardDismissMode,
    keyboardShouldPersistTaps,
    horizontal,
    style,
    contentContainerStyle,
    listEmptyComponent,
    onEndReached,
    onLayout,
    onContentSizeChange,
    refreshControl,
    ListFooterComponentStyle,
    scrollEventThrottle,
    onEndReachedThreshold,
  }: ListProps<T>,
  ref: ForwardedRef<FlatList<T>>,
) => {
  const styles = listStyles();

  const customDivider = isValidElement(DividerComponent) ? (
    DividerComponent
  ) : (
    <View />
  );

  const itemSeparator = customDivider ? (
    customDivider
  ) : (
    <Divider variant={horizontal ? 'vertical' : 'horizontal'} />
  );

  const renderItem: ListRenderItem<T> = ({item, index}) => (
    <>
      {index === 0 && showTopDivider ? itemSeparator : null}
      {renderRow(item, index)}
      {index === items.length - 1 && showBottomDivider ? itemSeparator : null}
    </>
  );

  let content = (
    <FlatList
      ref={ref}
      onLayout={onLayout}
      style={style}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      data={items}
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparator as unknown as ComponentType<any>}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={bounces}
      alwaysBounceHorizontal={alwaysBounceHorizontal}
      alwaysBounceVertical={alwaysBounceVertical}
      ListHeaderComponent={horizontal ? null : headerComponent}
      ListFooterComponent={horizontal ? null : bottomComponent}
      keyboardDismissMode={keyboardDismissMode}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      horizontal={horizontal}
      ListEmptyComponent={listEmptyComponent}
      onEndReached={onEndReached}
      onScrollToIndexFailed={noop}
      refreshControl={refreshControl}
      onContentSizeChange={onContentSizeChange}
      ListFooterComponentStyle={ListFooterComponentStyle}
      scrollEventThrottle={scrollEventThrottle}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );

  if (horizontal && headerComponent) {
    content = (
      <View>
        <>
          {isFunction(headerComponent) ? headerComponent({}) : headerComponent}
          {content}
          {isFunction(bottomComponent) ? bottomComponent({}) : bottomComponent}
        </>
      </View>
    );
  }

  return content;
};

export const List = memo(forwardRef(ListComponent)) as <T>(
  props: ListProps<T> & {ref?: ForwardedRef<FlatList<T>>},
) => ReactElement;
