import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../api/services/user.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    providers: [UserService],
    declarations: [LoginComponent]
})
export class LoginModule {}
