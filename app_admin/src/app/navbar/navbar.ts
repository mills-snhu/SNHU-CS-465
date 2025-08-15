import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../services/authentication';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  constructor(
    private authentocation: Authentication
  ){}

  ngOnInit() {}

  public isLoggedIn(): boolean{
    return this.authentocation.isLoggedIn();
  }

  public onLogout(): void {
    return this.authentocation.logout();
  }

}
