import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseServiceService } from '../services/base-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {
  public thesisPayload:FormGroup;
  public isSubmitted:boolean=false;
  constructor(private fb:FormBuilder,private baseService:BaseServiceService) { }

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
    this.initalizeCounter();
  }

  public onSubmit(){
    this.isSubmitted=true;
    if(this.thesisPayload.valid)
    {
      this.baseService.saveThesisData(this.thesisPayload.value).subscribe(res=>{
        console.log(res);
      });
    }
  }

  public initalizeCounter(){
    //Animate my counter from 0 to set number (6)
$({counter: 0}).animate({counter: 3}, {
  //Animate over a period of 2seconds
  duration: 3000,
  //Progress animation at constant pace using linear
  easing:'linear',
  step: function() {    
    //Every step of the animation, update the number value
    //Use ceil to round up to the nearest whole int
    $('.total').text(Math.ceil(this.counter))
  },
  complete: function() {
    //Could add in some extra animations, like a bounc of colour change once the count up is complete.
  }
});
  }


  get f(){
    return this.thesisPayload.controls;
  }

}
