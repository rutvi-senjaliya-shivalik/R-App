import { Language } from '../../../utils/translation';
import { SET_LANGUAGE, LOAD_LANGUAGE, LanguageActionTypes } from '../../actions/language/languageAction';

const LANGUAGE_STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'en';

interface LanguageState {
  language: Language;
  isLoading: boolean;
}

const initialState: LanguageState = {
  language: DEFAULT_LANGUAGE,
  isLoading: true,
};

const languageReducer = (
  state: LanguageState = initialState,
  action: LanguageActionTypes,
): LanguageState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        isLoading: false,
      };
    case LOAD_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default languageReducer;

