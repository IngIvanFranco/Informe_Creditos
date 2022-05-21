import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
path:String = Path.url;

constructor(private rutas:Router){

}

  ngOnInit(): void {
  }


}
