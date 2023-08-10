import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
  ],
})
export class TablePaginationExample implements AfterViewInit {
  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  dataSource = new MatTableDataSource(PEOPLE);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValues = {
    name: '',
    id: '',
    colour: '',
    pet: '',
  };

  ngAfterViewInit() {
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(prop: 'pet' | 'id' | 'name' | 'colour', thing: Event) {
    let filter = (thing.target as HTMLInputElement).value;

    this.filterValues[prop] = filter;
    this.dataSource.filter = JSON.stringify(this.filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1 &&
        data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1 &&
        data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1
      );
    };
    return filterFunction;
  }
}

const PEOPLE = [
  {
    name: 'John',
    id: 1,
    colour: 'Green',
    pet: 'Dog',
  },
  {
    name: 'Sarah',
    id: 2,
    colour: 'Purple',
    pet: 'Cat',
  },
  {
    name: 'Lindsay',
    id: 3,
    colour: 'Blue',
    pet: 'Lizard',
  },
  {
    name: 'Megan',
    id: 4,
    colour: 'Orange',
    pet: 'Dog',
  },
];
