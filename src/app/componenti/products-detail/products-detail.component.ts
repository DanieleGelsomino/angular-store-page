import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss'],
})
export class ProductsDetailComponent implements OnInit {
  @Input() data!: any;
  constructor() {}

  ngOnInit(): void {}
}
