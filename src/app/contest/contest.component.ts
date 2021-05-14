import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from '../services/base-service.service';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  public thesisPayload:FormGroup;
  public isSubmitted:boolean=false;
  public isLoading:boolean=false; 
  public showAlert:boolean=false;
  public alertType:string="success";
  public message:string;
  public count:number=0;
  public token:any;
  public inheritance:any=[
    {name:'Autosomal Dominant',value:'Autosomal Dominant'},
    {name:'Autosomal Recessive',value:'Autosomal Recessive'},
    {name:'X-linked dominant',value:'X-linked dominant'},
    {name:'X-linked recessive',value:'X-linked recessive'},
    {name:'Y-linked',value:'Y-linked'},
    {name:'Digenic',value:'Digenic'},
    {name:'Multifactorial',value:'Multifactorial'},
    {name:'Mitochondrial',value:'Mitochondrial'},
    {name:'Other',value:'Other'}
  ]
  
  constructor(private fb:FormBuilder,private baseService:BaseServiceService,private router:Router,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.thesisPayload=this.fb.group({
      diseaseName:['',Validators.required],
      alternateDiseaseName:['',Validators.required],
      gene:['',Validators.required],
      inheritance:['',Validators.required],
      phenoTypeId:['',Validators.required],
      symptoms:['',Validators.required],
      disorder:['',Validators.required],
      Diagnosis:['',Validators.required],
    });

    this.token=jwt_decode(localStorage.getItem('token'));
     
    this.baseService.getTotalCount({userId:this.token.data._id})      .subscribe(
      (response:any) => {                           //Next callback
        this.count=response.count;         
      },
      (error) => {                              //Error callback
        this.message=error.error.errors[0].Message;
      }
    )
  }

  public onSubmit(){
    this.isSubmitted=true;
    if(this.thesisPayload.valid)
    {
      this.isLoading=true;
      let payload={
        ...this.thesisPayload.value,
        userId:this.token.data._id
      }
      this.baseService.saveThesisData(payload)
      .subscribe(
        (response:any) => {                           //Next callback
          this.isSubmitted=false;
          this.isLoading=false;
          this.alertType="success"
          this.showAlert=true;
          setTimeout(() => {
            this.showAlert=false;
          }, 4000);
          window.scroll(0,0);
          this.message=response.Message;  
          this.count=response.count; 
          this.thesisPayload.reset();
          
        },
        (error) => {                              //Error callback
          this.message=error.error.errors[0].Message;
          this.isLoading=false;
          
          this.alertType="danger"
          this.showAlert=true;
          setTimeout(() => {
            this.showAlert=false;
          }, 4000);
          window.scroll(0,0); 
        }
      )
    }else{
      this._snackbar.open('Please fill all mandatory fields',"close",{duration:3000}); 
    }
  }




  get f(){
    return this.thesisPayload.controls;
  }

  public logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);

  }



}
