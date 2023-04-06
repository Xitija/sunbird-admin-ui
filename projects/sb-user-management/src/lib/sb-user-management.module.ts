import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { SbUserManagementComponent } from "./sb-user-management.component";
import { UserListComponent } from "./user-list/user-list.component";
@NgModule({
  declarations: [SbUserManagementComponent, UserListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    DropdownModule,
  ],
  exports: [SbUserManagementComponent],
})
export class SbUserManagementModule {}
