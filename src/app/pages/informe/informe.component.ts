import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { InformeService } from 'src/app/services/informe.service';
import { Path } from '../../config';
import { Router } from '@angular/router';
import { Loading, Report } from 'notiflix';




@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements  OnInit {
  path:String = Path.url;
 fomrulariofiltro:FormGroup
 creditos: any;
 render:boolean =false

  displayedColumns: string[] = ['Fecha', 'Cedula', 'Nombres', 'Apellidos','Monto','Plazo','Cuota','Tipo_Credito','Ciudad'];
  dataSource:any


  constructor(
    private cliente:InformeService,
    public formulario:FormBuilder,
    public rutas:Router
  ) {
    this.fomrulariofiltro=this.formulario.group({
      fi:['',Validators.required],
      ff:['',Validators.required]
    })
  }


  ngOnInit(): void {



  }


  salir(){
    sessionStorage.removeItem('token')
  this.rutas.navigateByUrl('/')
  }

traerdatos(){
Loading.circle()

  if( this.fomrulariofiltro.valid ){

this.cliente.prestamos(this.fomrulariofiltro.value).subscribe(res=>{
  this.creditos = res
  this.dataSource=this.creditos
this.render=true
Loading.remove()


}, err =>{
  Loading.remove()
Report.failure(
  'Femseapto',
  'Algo fallo en el proceso',
  'OK'
)
this.salir()
})
}else{
  Loading.remove()
}
}



}
