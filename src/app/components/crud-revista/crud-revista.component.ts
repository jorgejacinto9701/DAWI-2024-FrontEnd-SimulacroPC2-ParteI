import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { RevistaService } from '../../services/revista.service';
import { MatTableDataSource } from '@angular/material/table';
import { Revista } from '../../models/revista.model';
import { MatDialog } from '@angular/material/dialog';
import { CrudRevistaAddComponent } from '../crud-revista-add/crud-revista-add.component';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-revista',
  templateUrl: './crud-revista.component.html',
  styleUrls: ['./crud-revista.component.css']
})
export class CrudRevistaComponent {

  //Para filtrar la Grilla
  filtro : string = "";

  //Para los datos de la Grilla
  dataSource : any;

  displayedColumns = ["idRevista","nombre"];

  constructor(private revistaService:RevistaService,
               private dialogService: MatDialog
  ){

  }

  public refrescarGrilla(){
      var msg = this.filtro == "" ? "todos" : this.filtro;
      this.revistaService.consultarCrud(msg).subscribe(
            x => {
                this.dataSource = new MatTableDataSource<Revista>(x);
            }
      );

  }

  openAddDialog(){
    console.log(">>> openAddDialog [ ini ]");
    const dialog = this.dialogService.open(CrudRevistaAddComponent);
    dialog.afterClosed().subscribe(
        x => {
              console.log(">>> x >> "  + x);
              if (x === 1){
                this.refrescarGrilla();
              }
        }
    );

    console.log(">>> openAddDialog [ fin ]");
  }

  openUpdateDialog(){
    console.log(">>> openUpdateDialog [ ini ]");


    console.log(">>> openUpdateDialog [ fin ]");
  }


}
