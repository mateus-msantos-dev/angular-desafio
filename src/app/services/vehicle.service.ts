import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // Buscar dados de veículos (cards superiores)
  getVehicles() {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/vehicles`));
  }

  // Buscar dados de um VIN específico (tabela)
  getVehicleData(vin: string) {
    return firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin })
    );
  }
}
