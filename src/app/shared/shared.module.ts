import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedNodule {

}