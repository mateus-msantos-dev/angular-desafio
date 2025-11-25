import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // AQUI é 100% seguro inicializar o formulário
    this.form = this.fb.group({
      nome: [''],
      senha: [''],
      lembrar: [false]
    });
  }

  async submit() {
    this.errorMessage = null;

    try {
      const resp = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.value)
      });

      const data = await resp.json();

      if (!resp.ok) {
        this.errorMessage = data.message;
        return;
      }

      this.router.navigate(['/home']);

    } catch (err) {
      this.errorMessage = 'Erro ao conectar ao servidor.';
    }
  }
}