import React, {
  ComponentType,
  RefObject,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';
// Lazy-load mask component only if used and available
import { textInputStyles } from './styles';
import { TIcon } from '../../../types';
import { useHandleKeyboardInput } from '../HandleKeyboard';
import { Icon } from '../Icon';
import { isTabletDevice } from '../../../utils/constants';
import { COLORS } from '../../../constants';

export type RnTextInputArgs = [string];
export type MaskedInputProps = [string, string];
export type textInputRef = RNTextInput;

export interface TextInputProps extends Omit<RNTextInputProps, 'onChangeText'> {
  readonly disabled?: boolean;
  readonly onChangeText?:
    | ((value: string) => void)
    | ((maskedValue: string, value: string) => void);
  readonly error?: boolean;
  readonly readonly?: boolean;
  readonly wrapperStyle?: StyleProp<ViewStyle>;
  readonly mask?: string;
  mode?: 'normal' | 'outlined';
  label?: string;
  labelWithStar?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  messageText?: string;
  iconLeft?: TIcon;
  iconRight?: TIcon;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  handleKeyboard?: boolean;
  focusNextFieldOnSubmit?: boolean;
  focusFieldByRefOnSubmit?: RefObject<RNTextInput> | null;
  inputComponent?: ComponentType<TextInputProps>;
}

export const TextInput = memo(
  forwardRef<textInputRef, TextInputProps>(
    (
      {
        disabled,
        onChangeText,
        error,
        readonly,
        multiline,
        wrapperStyle,
        style,
        keyboardType,
        mask,
        mode = 'normal',
        label,
        labelWithStar,
        labelStyle,
        messageText,
        iconLeft,
        onLeftIconPress,
        iconRight,
        onRightIconPress,
        onFocus,
        onBlur,
        onSubmitEditing,
        handleKeyboard = true,
        focusNextFieldOnSubmit = false,
        focusFieldByRefOnSubmit = null,
        inputComponent,
        ...props
      },
      ref,
    ) => {
      // Determine which input component to render, lazily requiring mask component if needed
      let ResolvedInputComponent: ComponentType<TextInputProps> =
        (inputComponent as ComponentType<TextInputProps>) ||
        (RNTextInput as unknown as ComponentType<TextInputProps>);
      if (mask) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const MaskModule = require('react-native-text-input-mask');
          const MaskComponent =
            MaskModule?.default ?? MaskModule?.TextInputMask ?? null;
          if (MaskComponent) {
            ResolvedInputComponent =
              MaskComponent as unknown as ComponentType<TextInputProps>;
          }
        } catch (_e) {
          ResolvedInputComponent =
            RNTextInput as unknown as ComponentType<TextInputProps>;
        }
      }
      const styles = textInputStyles();
      const isFocusedRef = useRef(false);
      const [isFocused, setIsFocused] = useState(false);

      const {
        handleContainerNode,
        containerToHandleRef,
        inputRef,
        focusNextInput,
        focusInputByRef,
      } = useHandleKeyboardInput(ref);

      const onLayout = useCallback(() => {
        if (isFocusedRef.current) {
          handleContainerNode();
        }
      }, [handleContainerNode]);

      const leftIcon = !!iconLeft && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onLeftIconPress}
          style={{ marginEnd: 8 }}
        >
          <Icon
            name={iconLeft}
            color={disabled ? COLORS.GREY_TEXT : COLORS.BLUE_TEXT}
            size={20}
          />
        </TouchableOpacity>
      );

      const rightIcon = !!iconRight && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{ marginStart: 8 }}
        >
          <Icon
            name={iconRight}
            color={disabled ? COLORS.GREY_TEXT : COLORS.BLUE_TEXT}
          />
        </TouchableOpacity>
      );

      const handleFocus = (
        event: NativeSyntheticEvent<TextInputFocusEventData>,
      ) => {
        setIsFocused(true);
        onFocus?.(event);
        if (handleKeyboard) {
          handleContainerNode();
        }
        isFocusedRef.current = true;
      };

      const handleBlur = (
        event: NativeSyntheticEvent<TextInputFocusEventData>,
      ) => {
        setIsFocused(false);
        onBlur?.(event);
        isFocusedRef.current = false;
      };

      const onSubmitEditingHandler = useCallback(
        e => {
          if (onSubmitEditing) {
            onSubmitEditing(e);
          }
          if (focusNextFieldOnSubmit) {
            focusNextInput();
          }
          if (focusFieldByRefOnSubmit?.current) {
            focusInputByRef(focusFieldByRefOnSubmit?.current);
          }
        },
        [
          focusFieldByRefOnSubmit,
          focusInputByRef,
          focusNextFieldOnSubmit,
          focusNextInput,
          onSubmitEditing,
        ],
      );

      const onChange = useCallback(
        (...args: RnTextInputArgs | MaskedInputProps) => {
          const [maskValue] = args as MaskedInputProps;
          const [value] = args as RnTextInputArgs;
          onChangeText?.(maskValue, value);
        },
        [onChangeText],
      );

      const ResolvedComp: any = ResolvedInputComponent;

      return (
        <View
          style={mode && { paddingTop: 8 }}
          ref={containerToHandleRef}
          onLayout={onLayout}
        >
          {label ? (
            <Text style={[styles.label, labelStyle]}>
              {label}
              {labelWithStar && <Text style={styles.star}>*</Text>}
            </Text>
          ) : null}
          <View
            style={[
              styles.inputWrapper,
              multiline && styles.multilineInputWrapper,
              isFocused && styles.activeInputWrapper,
              error && styles.invalidInputWrapper,
              disabled && styles.disabledInputWrapper,
              readonly && styles.readonlyInputWrapper,
              mode === 'outlined' && styles.outlinedInputWrapper,
              wrapperStyle,
            ]}
          >
            {leftIcon}
            <ResolvedComp
              ref={inputRef}
              multiline={multiline}
              style={[
                styles.input,
                multiline && styles.multilineInput,
                readonly && styles.readonlyInput,
                disabled && styles.disabledInput,
                style,
              ]}
              editable={!disabled && !readonly}
              // selectionColor={colors.input.focusedStr}
              placeholderTextColor={COLORS.GREY_TEXT}
              onChangeText={onChange as (value: string) => void}
              keyboardType={keyboardType}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onSubmitEditing={onSubmitEditingHandler}
              mask={mask}
              {...props}
            />
            {rightIcon}
          </View>
          {!!messageText && (
            <Text
              style={[styles.messageText, error && styles.errorMessageText]}
            >
              {messageText}
            </Text>
          )}
        </View>
      );
    },
  ),
);
