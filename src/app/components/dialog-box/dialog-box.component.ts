import { Component, Inject, OnInit } from '@angular/core';
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

  action: string;
  local_data: any;
  delete: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  doc: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,

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
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
  }

}
