import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl = 'http://localhost:3001';

  private isLoggedInStatus: boolean = false; 

  constructor(private http:HttpClient) { }

  login(usuario:Pick<Usuario, 'nome' | 'senha'>):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.apiurl}/login`, usuario)
  }
  
  setLoggedIn(): void {
    this.isLoggedInStatus = true; 
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus; 
  }

  logout(): void {
    this.isLoggedInStatus = false;
  }
}
