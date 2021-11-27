import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild , ChangeDetectorRef } from '@angular/core';
import { Table } from '../../interface/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent  implements OnInit {
  
  tableData: any;
  dataLimit = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild('table',{static:true}) table!: MatTable<any>;

  displayedColumns: string[] = [
    'healthIndex', 
    'endDate',
    'minValueDateTime', 
    'type', 
    'cowId', 
    'animalId', 
    'eventId', 
    'deletable', 
    'lactationNumber', 
    'daysInLactation',
    'ageInDays',
    'startDateTime',
    'reportingDateTime',
    'delete',
    'update',
  ];

  openDialog(action:any, obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      } else if(result.event == 'Update'){
      this.updateRowData(result.data);
      }
      else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
      else if(result.event == 'Documentation'){
        //console.log('view documentation')
      }
    });
  }

  constructor(private service: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.tableData()
    .subscribe(data => {
      this.tableData = data;
      this.dataLimit = new MatTableDataSource(this.tableData);
      this.dataLimit.paginator = this.paginator;
    });
  }


  addRowData(row_obj: any){
    const newRow = {
      healthIndex: row_obj.healthIndex,
      endDate : row_obj.endDate,
      minValueDateTime: row_obj.minValueDateTime,
      type: row_obj.type,
      cowId: row_obj.cowId,
      animalId: row_obj.animalId,
      eventId: row_obj.eventId,
      deletable: row_obj.delatable,
      lactationNumber: row_obj.lactationNumber,
      daysInLactation: row_obj.daysInLactation,
      ageInDays: row_obj.ageInDays,
      startDateTime: row_obj.startDateTime,
      reportingDateTime: row_obj.reportingDateTime
    }

    this.dataLimit.data.unshift(newRow);
    this.dataLimit = new MatTableDataSource<Table>(this.dataLimit.data);
    this.dataLimit.paginator = this.paginator;
    this.table.renderRows();

  }

  deleteRowData(row_obj: any){
    console.log(row_obj)
    console.log(this.dataLimit.data)

    for(var i=0;i<this.dataLimit.data.length;i++){
      if(this.dataLimit.data[i].action === "Delete"){
        const data = this.dataLimit.data;
        data.splice(this.dataLimit.data[i], 1);
        this.dataLimit.data = data;
      }
    }
  }

  updateRowData(row_obj: any){
    for(var i=0;i<this.dataLimit.data.length;i++){
      if(this.dataLimit.data[i].animalId == row_obj.animalId){
        this.dataLimit.data[i].healthIndex = row_obj.healthIndex;
        this.dataLimit.data[i].endDate = row_obj.endDate;
        this.dataLimit.data[i].minValueDateTime = row_obj.minValueDateTime;
        this.dataLimit.data[i].type = row_obj.type;
        this.dataLimit.data[i].deletable = row_obj.deletable;
        this.dataLimit.data[i].lactationNumber = row_obj.lactationNumber;
        this.dataLimit.data[i].daysInLactation = row_obj.daysInLactation;
        this.dataLimit.data[i].ageInDays = row_obj.ageInDays;
        this.dataLimit.data[i].startDateTime = row_obj.startDateTime;
        this.dataLimit.data[i].reportingDateTime = row_obj.reportingDateTime;
      }
    }
  }

}
