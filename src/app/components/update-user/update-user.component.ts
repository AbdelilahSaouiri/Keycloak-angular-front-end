import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  user!:any;

  formUserUpdate!:FormGroup;

  constructor(private route:ActivatedRoute,
    private userService:UserService,
   private fb:FormBuilder,
  private router:Router){}
  
  ngOnInit(): void {
   let id=this.route.snapshot.params['id'];
    this.ConsulterUser(id);
  
  }

  ConsulterUser(userId:string){
    this.userService.consulterUser(userId).subscribe({
      next:data=>{
        this.user=data;
        this.formUserUpdate=this.fb.group({
          firstName:this.fb.control(this.user['firstName']),
          lastName:this.fb.control(this.user['lastName']),
          email:this.fb.control(this.user['email'])
         })  
      },error:err=>{
        console.log(err)
      }
    })
  }

  updateUser(){
    let updateUser=this.formUserUpdate.value;
    console.log(updateUser);
    this.userService.updateUser(updateUser).subscribe({
      next:data=>{
        console.log(data)
        this.router.navigateByUrl('')
      },error:err=>{
        console.log(err)
      }
    })
  }
}
