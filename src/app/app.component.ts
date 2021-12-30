import { Component } from '@angular/core';
import { Achievements } from './interfaces/achievements';
import { Experiences } from './interfaces/experiences';
import { Person } from './interfaces/person';
import { Skills } from './interfaces/skills';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CV';
  person?: Person;
  experiences?: Experiences[];
  achievements?: Achievements[];
  skills?: Skills[];

}
