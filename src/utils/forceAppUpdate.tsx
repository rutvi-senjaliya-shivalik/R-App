/**
 * Utility to force app-wide updates when language changes
 * This ensures all components re-render with new translations
 */

import { EventEmitter } from 'events';

class AppUpdateEmitter extends EventEmitter {
  private static instance: AppUpdateEmitter;

  static getInstance(): AppUpdateEmitter {
    if (!AppUpdateEmitter.instance) {
      AppUpdateEmitter.instance = new AppUpdateEmitter();
    }
    return AppUpdateEmitter.instance;
  }

  /**
   * Emit language change event to force all components to update
   */
  emitLanguageChange(language: string) {
    this.emit('languageChanged', language);
  }

  /**
   * Subscribe to language change events
   */
  onLanguageChange(callback: (language: string) => void) {
    this.on('languageChanged', callback);
    return () => this.off('languageChanged', callback);
  }
}

export const appUpdateEmitter = AppUpdateEmitter.getInstance();

