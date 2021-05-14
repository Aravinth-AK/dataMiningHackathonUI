import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseServiceService } from '../services/base-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 public loginForm:FormGroup;
 public isSubmitted:boolean=false;
 public message:any;
  constructor(private _fb:FormBuilder,private baseService:BaseServiceService,private router:Router,private _snackbar:MatSnackBar) { }

  ngOnInit() {
   this.loginForm= this._fb.group({
    email:['',Validators.required],
     password:['',Validators.required]
   });
  } 
  
  onSubmit(){
    this.isSubmitted=true;
    if(this.loginForm.valid)
    {
      this.baseService.loginUser(this.loginForm.value)
      .subscribe(
        (response) => {                           //Next callback
            localStorage.setItem('token',response.token);
            this.router.navigate(['/contest']);         
        },
        (error) => {                              //Error callback
          this.message=error.error.errors[0].Message;
          this._snackbar.open(this.message,"close",{duration:3000}); 
        }
      )
    }else{
     this._snackbar.open('Please fill all mandatory fields',"close",{duration:3000}); 
    }
  }

  
  get f(){
    return this.loginForm.controls;
  }

}
