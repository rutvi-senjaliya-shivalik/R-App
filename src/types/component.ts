import { ReactNode } from 'react';

export interface HeaderComponentProps {
    Title: string;
    onPress: any;
    showLanguageSelector?: boolean;
    titleStyle?: any;
    rightAction?: ReactNode;
  }