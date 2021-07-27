import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  errorMessage = "";
  userModel = new User("gift", "gift@gmail.com", 5555556, "default", "morning", true);

  constructor(private _enrollmentService: EnrollmentService) { }
  validateTopic(value: any) {

    if (value === "default") {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log("Success!", data),
        error => this.errorMessage = error.statusText
      )
  }
}
