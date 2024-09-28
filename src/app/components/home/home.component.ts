import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SecurityService } from '../../services/security.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

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
    public key:KeycloakService,
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
    let id=user['userId'];
    this.router.navigateByUrl( `/update/${id}`)
  }

  handleDeleteUser(user:any){
    const cofirmDeleteUser=confirm("are you sure to delete this user")
    if(cofirmDeleteUser)
   {
    this.userService.deleteUser(user).subscribe({
      next:(resp:HttpResponse<any>)=>{
       if(resp.status==204){
        alert("User deleted with success")
        this.getUsers()
       }
     },error:err=>{
        console.log(err)
     }
  });
   }
}

}
