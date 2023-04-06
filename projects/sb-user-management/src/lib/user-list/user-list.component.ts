import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { UserService } from "../services/user-service/user.service";
import { LazyLoadEvent } from "primeng/api";
import { environment } from "../services/user-service/data";
@Component({
  selector: "lib-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  tableColumns: any[] = [];
  statusOptions: any[] = [];
  users: any;
  count: any;
  first = 0;
  rows = 100; // input value
  channelId = environment.channelId;
  datasource: any = [];
  totalRecords: number = 0;
  value: any = "";

  loading: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.tableColumns = [
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      //{ field: 'role', header: 'Role' },
      { field: "email", header: "Email" },
      { field: "phone", header: "Phone" },
      { field: "status", header: "Status" },
      { field: "channel", header: "Channel" },
    ];

    this.statusOptions = [
      { name: "Active", statusValue: "1" },
      { name: "Inactive", statusValue: "0" },
    ];
  }

  loadUsers(event: LazyLoadEvent) {
    console.log(event);
    const apiFilters = this.getFiltersforApi(event?.filters);
    this.loading = true;
    if (this.datasource) {
      this.userService
        .getUsersInOrganization(apiFilters, event?.first)
        .subscribe(
          (data) => {
            const resData: any = data;
            this.totalRecords = resData?.result?.response?.count;
            this.users = resData?.result?.response?.content;
            // console.log(this.users);
            this.loading = false;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  getFiltersforApi(event: any) {
    console.log(event);
    let filtersforApi = {
      rootOrgId: this.channelId,
    };

    for (let key in event) {
      if (key === "status") {
        filtersforApi = {
          ...filtersforApi,
          ...(event[key]?.value?.statusValue && {
            [key]: event[key]?.value?.statusValue,
          }),
        };
      } else {
        filtersforApi = {
          ...filtersforApi,
          ...(event[key]?.value && { [key]: event[key]?.value }),
        };
      }
    }
    console.log(filtersforApi);

    return filtersforApi;
  }
}
