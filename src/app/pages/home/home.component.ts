import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Path } from '../../config';

import { LoginService } from 'src/app/services/login.service';
import { Loading, Report } from 'notiflix';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fomrulariologin: FormGroup;
  alert:boolean | undefined;
  path:String = Path.url;
  respuesta: any;
  constructor(
    public formulario: FormBuilder,
    private service:LoginService,
    private rutas:Router,
  ) {
    this.fomrulariologin = this.formulario.group(
      {
        usr:['',Validators.required],
        pass:['',Validators.required]
      }
    )
  }

  ngOnInit(

  ): void {

  }


login(){
  if (this.fomrulariologin.valid) {
    Loading.pulse()


this.service.login(this.fomrulariologin.value).subscribe(res => {
  this.respuesta = res;
if (this.respuesta['success'] == 1) {
// clave erronea

Loading.remove()
Report.failure(
  'Femseapto',
  'Password equivocado',
  'ok'
)
}else if (this.respuesta['success'] == 0){
  // no hay usuario
  Loading.remove()
Report.failure(
  'Femseapto',
  'Usuario no encotrado',
  'ok'
)
}else {
  //login ok
  Loading.remove()
  let token = btoa(this.respuesta['token'])
sessionStorage.setItem('token',token)
this.rutas.navigateByUrl('/Informe')


}

}, err =>{
  console.log(err.error);

})


  }else{
    this.alert = true;
  }


}

}
