import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../servizi/products.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  products: any;
  product: any;
  isSingleProduct!: boolean;
  isLoading = false;
  singleParamProduct = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'titolo', 'prezzo', 'dettagli'];
  dataSource = new MatTableDataSource(this.productsService.getProducts());
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    if (this.singleParamProduct) {
      this.isSingleProduct = true;
      this.product = this.productsService.getProduct(
        parseInt(this.singleParamProduct!)
      );
    } else {
      this.isSingleProduct = false;
      this.loadProducts();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadProducts() {
    this.isLoading = true;
    setTimeout(() => {
      this.products = this.productsService.getProducts();
      this.isLoading = false;
    }, 1000);
  }
}
