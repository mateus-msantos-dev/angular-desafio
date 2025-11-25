import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; 
// import { Usuario } from '../../models/usuario.model'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
 ) {
    this.form = this.fb.group({
      nome: [''],
      senha: [''],
      lembrar: [false]
    });
  }

  submit() { 
    this.errorMessage = null;

    const usuarioParaAPI = { 
        nome: this.form.value.nome, 
        senha: this.form.value.senha 
    };

    this.authService.login(usuarioParaAPI).subscribe({
        next:(response)=>{
            this.authService.setLoggedIn();
            
             this.router.navigate(['/home']);
        },
        error:(err)=>{
    
            const apiMessage = err.error?.message || "Erro de conexão com o servidor.";
            this.errorMessage = apiMessage;
             alert("Usuário ou senha incorretos");
        }
    });
  }
}