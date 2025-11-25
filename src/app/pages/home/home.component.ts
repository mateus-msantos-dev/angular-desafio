import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  menuOpen = false;
  userMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.userMenuOpen = false;
    this.router.navigate(['/login']);
  }

  closeAllMenus() {
    this.menuOpen = false;
    this.userMenuOpen = false;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: any) => {
    const userMenu = document.querySelector('.logout-menu');
    const userButton = document.querySelector('.botao-usuario');

    if (!userMenu || !userButton) return;

    const clickedInsideMenu = userMenu.contains(event.target);
    const clickedButton = userButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      this.userMenuOpen = false;
    }
  };
}
