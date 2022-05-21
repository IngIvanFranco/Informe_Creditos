import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
token:any
  private api:String = Api.url;

  constructor(
    private cliente:HttpClient
  ) { }


  prestamos(fechas: undefined){
  
    return this.cliente.post(`${this.api}?consulta`,fechas)
  }
}
