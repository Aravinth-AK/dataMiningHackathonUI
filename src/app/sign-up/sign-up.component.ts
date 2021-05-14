import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseServiceService } from '../services/base-service.service';4
import { faUniversity } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  fauniversity=faUniversity;
  public canditateForm:FormGroup;
  public isSubmitted:boolean=false;
  public isLoading:boolean=false; 
  public message:string;

  constructor(private fb:FormBuilder,
    private baseService:BaseServiceService,
    private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.canditateForm=this.fb.group({
      userName:['',Validators.required],
      university:['',Validators.required],
      email:['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',Validators.required],
      phoneNumber:['',Validators.required],
    })
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.canditateForm.valid){
      this.isLoading=true;
      this.baseService.postNewUser(this.canditateForm.value)
      .subscribe(
        (response:any) => {                           //Next callback
          this.isSubmitted=false;
          this.isLoading=false;
          this.message=response.Message;
          this._snackbar.open(this.message,"close",{duration:3000});       
          this.canditateForm.reset();
        },
        (error) => {                              //Error callback
          if(error.error.errors[0].Message)
          this.message=error.error.errors[0].Message;
          else
          this.message="Oops! something went wrong. Please try again"
          this.isLoading=false;
          this._snackbar.open(this.message,"close",{duration:3000});
        }
      )
    }else{
      this._snackbar.open('Please fill all mandatory fields',"close",{duration:3000}); 
    }
  }

  get f(){
    return this.canditateForm.controls;
  }

}
