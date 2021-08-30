import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PublicUser} from "../../models/public-user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, AfterViewInit {

  searchForm = new FormGroup({
    search: new FormControl("", [Validators.required, Validators.minLength(2)]),
  });

  displayedColumns: string[] = ['name', 'username', 'action'];
  dataSource = new MatTableDataSource<PublicUser>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private tService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.userService
      .searchPublicUsersByName(this.searchForm.value.search)
      .subscribe(
        (response: PublicUser[]) => {
          this.dataSource = new MatTableDataSource<PublicUser>(response);
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not create user');
        }
      );
  }

  viewUser(username: string): void {
    this.router.navigateByUrl('users/' + username);
  }
}
