import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { RevistaService } from '../../services/revista.service';
import { MatTableDataSource } from '@angular/material/table';
import { Revista } from '../../models/revista.model';

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

  constructor(private revistaService:RevistaService){

  }

  public refrescarGrilla(){
      var msg = this.filtro == "" ? "todos" : this.filtro;
      this.revistaService.consultarCrud(msg).subscribe(
            x => {
                this.dataSource = new MatTableDataSource<Revista>(x);
            }
      );

  }



}
