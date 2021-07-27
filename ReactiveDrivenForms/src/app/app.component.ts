import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReactiveDrivenForms';
  registrationForm: any;
   
  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails() {
    this.alternateEmails.push(this.formBuilder.control(''));
  }


  constructor(private formBuilder: FormBuilder, private _registrationService: RegistrationService) { }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      alternateEmails: this.formBuilder.array([])

    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe((checkedValue: any) => {
        const email = this.registrationForm.get('email');

        if (checkedValue) {
          email.setValidators(Validators.required);

        } else {
          email.clearVaidators();
        }
        email.updateValueAndValidity();
      });
  }


 /*
  registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),


  });
*/

  loadApiData() {
    this.registrationForm.patchValue({
      userName: "Gift-M",
      password: "test",
      confirmPassword: "test"

    })
  }
  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log("Success!", response),
        error => console.error("Error", error)
      );
  }
}
