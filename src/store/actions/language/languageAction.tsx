import { Language } from '../../../utils/translation';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOAD_LANGUAGE = 'LOAD_LANGUAGE';

export interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: Language;
}

export interface LoadLanguageAction {
  type: typeof LOAD_LANGUAGE;
  payload: Language;
}

export type LanguageActionTypes = SetLanguageAction | LoadLanguageAction;

export const setLanguageAction = (language: Language): SetLanguageAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const loadLanguageAction = (language: Language): LoadLanguageAction => ({
  type: LOAD_LANGUAGE,
  payload: language,
});

