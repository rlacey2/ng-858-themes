import { Injectable, inject, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Unified type definitions containing all 7 themes matching the theme-* standard prefix
export type ThemeType = 
  | 'theme-light' 
  | 'theme-dark' 
  | 'theme-nature' 
  | 'theme-cyberpunk' 
  | 'theme-coffee' 
  | 'theme-ocean' 
  | 'theme-pastel';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private STORAGE_KEY = 'app-theme';
  private DEFAULT_THEME: ThemeType = 'theme-light';

  // 1. Initialize signal state directly from storage
  public currentTheme = signal<ThemeType>(this.getSavedTheme());

  constructor() {
    effect(() => {
      const activeTheme = this.currentTheme();
      const body = this.document.body;

      // 2. Efficiently remove ALL classes matching the prefix "theme-"
      const classesToRemove = Array.from(body.classList).filter(className => 
        className.startsWith('theme-')
      );
      
      if (classesToRemove.length > 0) {
        body.classList.remove(...classesToRemove);
      }

      // 3. Append the active selection frame
      body.classList.add(activeTheme);

      // 4. Synchronize user choices
      localStorage.setItem(this.STORAGE_KEY, activeTheme);
    });
  }

  public updateTheme(newTheme: ThemeType): void {
    this.currentTheme.set(newTheme);
  }

  private getSavedTheme(): ThemeType {
    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeType;
    
    // Explicitly validates against the unified prefix structure
    const validThemes: ThemeType[] = [
      'theme-light', 'theme-dark', 'theme-nature', 
      'theme-cyberpunk', 'theme-coffee', 'theme-ocean', 'theme-pastel'
    ];
    
    return validThemes.includes(saved) ? saved : this.DEFAULT_THEME;
  }
}
