import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 public loginForm:FormGroup;
 public isSubmitted:boolean=false;
  constructor(private _fb:FormBuilder) { }

  ngOnInit() {
   this.loginForm= this._fb.group({
     username:['',Validators.required],
     password:['',Validators.required]
   });
  } 
  
  onSubmit(){
    this.isSubmitted=true;
  }

}
