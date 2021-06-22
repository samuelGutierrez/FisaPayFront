import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterOnlyLayoutComponent } from "./components/footer-only-layout/footer-only-layout.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LayoutRoutingModule } from "./layout-routing.module";

@NgModule({
    declarations: [
        FooterComponent,
        FooterOnlyLayoutComponent,
        HeaderComponent,
        MainLayoutComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        FlexLayoutModule,
    ]
})
export class LayoutModule { }