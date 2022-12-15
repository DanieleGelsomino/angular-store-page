import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;

  constructor() {}

  ngOnInit(): void {}
}
