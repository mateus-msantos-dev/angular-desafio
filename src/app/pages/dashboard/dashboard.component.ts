import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  menuOpen = false;
  userMenuOpen = false;

  vinInput: string = '';

  odometro: number | null = null;
  nivelCombustivel: number | null = null;
  status: string | null = null;
  lat: number | null = null;
  long: number | null = null;

  selectedVehicleData: any = null;

  allVehicles: any[] = []; 

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  // -----------------------------
  // CICLO DE VIDA
  // -----------------------------
  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside);
  
    this.loadAllVehicles();
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  
  // -----------------------------
  // MENU
  // -----------------------------
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  closeAllMenus() {
    this.menuOpen = false;
    this.userMenuOpen = false;
  }

  handleClickOutside = (event: any) => {
    const userMenu = document.querySelector('.logout-menu');
    const userButton = document.querySelector('.botao-usuario');

    if (!userMenu || !userButton) return;

    const insideMenu = userMenu.contains(event.target);
    const button = userButton.contains(event.target);

    if (!insideMenu && !button) {
      this.userMenuOpen = false;
    }
  };

  // -----------------------------
  // CARREGAR DADOS INICIAIS (CARDS)
  // -----------------------------
  async loadAllVehicles() {
    try {
      const resp = await this.vehicleService.getVehicles(); 
  
      this.allVehicles = resp.vehicles || [];

    } catch (err) {
      console.error("Erro ao carregar veículos:", err);
    }
  }

  // -----------------------------
  // LIMPAR VIN
  // -----------------------------
  clearVinData() {
    this.odometro = null;
    this.nivelCombustivel = null;
    this.status = null;
    this.lat = null;
    this.long = null;

    this.selectedVehicleData = null;
  }

  // -----------------------------
  // BUSCAR VIN NA API
  // -----------------------------
  async onVinEnter() {
    if (!this.vinInput) {
      this.clearVinData();
      return;
    }

    try {

      const respTabela = await this.vehicleService.getVehicleData(this.vinInput);
      
      const vehicleForCards = this.allVehicles.find(v => v.id === respTabela.id);

      if (vehicleForCards) {
    
        this.selectedVehicleData = {
          ...vehicleForCards, 
          ...respTabela       
        };
      } else {
    
        this.selectedVehicleData = respTabela;
        console.warn("Não foi possível correlacionar o VIN com os dados dos Cards. Verifique se o 'id' existe.");
      }

      this.odometro = respTabela.odometro ?? null;
      this.nivelCombustivel = respTabela.nivelCombustivel ?? null;
      this.status = respTabela.status ?? null;
      this.lat = respTabela.lat ?? null;
      this.long = respTabela.long ?? null;

    } catch (err) {
      console.error("Erro VIN:", err);
      this.clearVinData();
    }
  }

}
