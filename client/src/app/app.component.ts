import { Component, OnInit } from '@angular/core';
import { IProduct } from './share/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  products: IProduct[];

  constructor() {}

  ngOnInit(): void {}
}
