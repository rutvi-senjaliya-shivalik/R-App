import { RootState } from '../reducers';

export const selectLanguage = (state: RootState) => state.language?.language || 'en';
export const selectLanguageLoading = (state: RootState) => state.language?.isLoading || false;

