import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Table {
  healthIndex: number;
  endDate: null;
  minValueDateTime: number;
  type: string;
  cowId: number;
  animalId: number;
  eventId: number;
  deletable: boolean;
  lactationNumber: number;
  daysInLactation: number;
  ageInDays: number;
  startDateTime: number;
  reportingDateTime: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  formGroup!: FormGroup;
  action: string;
  local_data: any;
  delete: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  doc: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Table) {
    this.local_data = {...data};
    this.action = this.local_data.action;
    if(this.action === "Delete"){
      this.delete = true;
    } else if (this.action === "Add"){
      this.add = true;
    } else if( this.action === "Update") {
      this.edit = true;
    } else {
      this.doc = true;
    }
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.formGroup.value});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'healthIndex': [this.local_data.healthIndex || ''],
      'endDate': [this.local_data.endDate || ''],
      'minValueDateTime': [this.local_data.minValueDateTime || ''],
      'type': [this.local_data.type || ''],
      'cowId': [this.local_data.cowId || ''],
      'animalId': [this.local_data.animalId || ''],
      'eventId': [this.local_data.eventId || ''],
      'deletable': [this.local_data.deletable || ''],
      'lactationNumber': [this.local_data.lactationNumber || ''],
      'daysInLactation': [this.local_data.daysInLactation || ''],
      'ageInDays': [this.local_data.ageInDays || ''],
      'startDateTime': [this.local_data.startDateTime || ''],
      'reportingDateTime': [this.local_data.reportingDateTime || ''],

    });
  }

  submit(value: any) {
    this.dialogRef.close(value);

  }

}
