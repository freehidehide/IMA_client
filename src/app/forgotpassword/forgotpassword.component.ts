import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: "app-forgotpassword",
    templateUrl: "./forgotpassword.component.html",
    styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit {
    public isSubmitted: boolean;
    public forgotpasswordForm: FormGroup;
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.forgotpasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get f() {
        return this.forgotpasswordForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.forgotpasswordForm.invalid) {
            return;
        }
    }
}
