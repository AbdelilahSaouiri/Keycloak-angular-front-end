import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  
  formUser!:FormGroup;

  constructor(private fb:FormBuilder,
    private userSerive:UserService,
   private router:Router){}


  ngOnInit(): void {
    this.formUser=this.fb.group({
      firstName:this.fb.control(""),
      lastName:this.fb.control(""),
      email:this.fb.control("")
    })
  }


  handleForm(){
    let user= this.formUser.value;
    this.userSerive.addNewUser(user).subscribe({
      next:data=>{
        console.log(data)
        this.router.navigateByUrl("");
      },error:err=>{
        console.log(err)
        this.router.navigateByUrl("");
      }
    })
  }
}
