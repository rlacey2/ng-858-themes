import { Component, inject, signal } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class AppComponent {
  protected themeService = inject(ThemeService);

  public isMenuOpen = signal<boolean>(false);
  public isSubMenuOpen = signal<boolean>(false);
  public isThemeMenuOpen = signal<boolean>(false);

    // Fallback mocks for navbar parameters
  public navbarCollapse: any = null;

  public toggleMenu(event: Event): void {
    this.isMenuOpen.update(v => !v);
  }

  public toggleSubMenu(open: boolean): void {
    this.isSubMenuOpen.set(open);
  }

  public toggleThemeMenu(open: boolean): void {
    this.isThemeMenuOpen.set(open);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isSubMenuOpen.set(false);
  }

  public closeThemeMenu(): void {
    this.isThemeMenuOpen.set(false);
  }

  public handleMenuChoice(name: string, type: string, collapseRef: any): void {
    console.log(`Menu choice selected: ${name} (${type})`);
    this.closeMenu();
    this.closeThemeMenu();
  }
}
