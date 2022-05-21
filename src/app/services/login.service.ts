import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { login } from './login';

import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private api:String = Api.url;
  constructor(
    private cliente:HttpClient
  ) { }

login(usr:login){
return this.cliente.post(`${this.api}?login`,usr)
}


}
