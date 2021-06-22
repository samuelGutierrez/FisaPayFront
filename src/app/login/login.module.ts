import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      LoginRoutingModule,
      FlexLayoutModule
    ]
  })

export class LoginModule { }