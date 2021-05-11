import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from '../services/base-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  canditateForm:FormGroup;
  constructor(private fb:FormBuilder,private baseService:BaseServiceService) { }

  ngOnInit(): void {
    this.canditateForm=this.fb.group({
      userName:['',Validators.required],
      university:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      phoneNumber:['',Validators.required],
    })
  }

}
