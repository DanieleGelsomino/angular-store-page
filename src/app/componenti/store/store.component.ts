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
export class StoreComponent implements OnInit, AfterViewInit {
  products: any;
  product: any;
  isSingleProduct!: boolean;
  displayedColumns: string[] = ['id', 'titolo', 'prezzo', 'dettagli'];
  dataSource = new MatTableDataSource(this.productsService.getProducts());
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.isSingleProduct = true;
      this.product = this.productsService.getProduct(
        parseInt(this.route.snapshot.paramMap.get('id')!)
      );
    } else {
      this.isSingleProduct = false;
      this.products = this.productsService.getProducts();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
