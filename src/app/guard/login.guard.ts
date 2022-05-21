import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,   Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  token:any
constructor( private rutas:Router ){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ( sessionStorage.getItem('token') == null ) {
      this.rutas.navigateByUrl('/login')
      return false
    }else {
     this.token = sessionStorage.getItem('token')

     if (this.token.length == 80) {
      return true;
     }else{
       return false
     }


    }
  }

}
