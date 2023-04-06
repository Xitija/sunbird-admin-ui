import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./data";
// import { environment } from "../../../../../../src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsersInOrganization(filtersforApi: any, offsetValue = 0) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: environment.authkey,
      "x-authenticated-user-token": environment.usertoken,
    });

    const body = {
      request: {
        filters: filtersforApi,
        fields: [
          "firstName",
          "lastName",
          "userName",
          "id",
          "email",
          "phone",
          "createdDate",
          "roles",
          "managedBy",
          "status",
          "channel",
        ],
        limit: 100,
        offset: offsetValue,
      },
    };

    console.log(offsetValue);
    return this.http.post("api/user/v1/search", body, { headers: header });
  }
}
