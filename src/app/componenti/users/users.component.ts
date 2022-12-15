import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../servizi/users.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: any;
  user: any;
  isSingleUser!: boolean;
  singleParamUser = this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email', 'dettagli'];
  dataSource = new MatTableDataSource(this.usersService.getUsers());

  constructor(
    private usersService: UsersService,
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
    if (this.singleParamUser) {
      this.isSingleUser = true;
      this.user = this.usersService.getUser(parseInt(this.singleParamUser!));
    } else {
      this.isSingleUser = false;
      this.users = this.usersService.getUsers();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
