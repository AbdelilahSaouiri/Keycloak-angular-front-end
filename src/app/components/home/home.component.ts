import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SecurityService } from '../../services/security.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

   profile:any
    users:any;
  constructor(private userService:UserService,
    public sec:SecurityService,
    private key:KeycloakService,
     private router:Router){}

  ngOnInit(): void {
    if(this.key.isLoggedIn()){
      this.key.loadUserProfile().then(profile=>{
        this.profile=profile
      })
    }
    this.getUsers();
  }


  getUsers(){
    this.userService.getAllUsers().subscribe({
      next:data=>{
        this.users=data
      },error:err=>{
        console.log(err)
      }
    })
  }

  async login(){
    await this.key.login({
      redirectUri: window.location.origin 
    });
  }

  onLogout(){
    this.key.logout(window.location.origin)
  }

  handleUpdate(user:any){
    this.router.navigateByUrl(`/update/${user}`)
  }

  handleDeleteUser(user:any){

  }
}
