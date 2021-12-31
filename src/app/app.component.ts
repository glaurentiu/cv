import { Component, OnInit } from '@angular/core';
import { Achievements } from './interfaces/achievements';
import { Experiences } from './interfaces/experiences';
import { Person } from './interfaces/person';
import { Skills } from './interfaces/skills';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  url='';
  title = 'CV';
  person?: Person;
  experiences?: Experiences[];
  achievements?: Achievements[];
  skills: Skills[] = [{ skill: 'JavaScript' }];
  cvForm: FormGroup = new FormGroup({});
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.url ='./assets/image.png'
    this.initializeForm();
  }

  initializeForm(): void {
    this.cvForm = this.fb.group({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      education: this.fb.array([this.createEducation()]),
      experiences: this.fb.array([this.createExperiences()]),
    });
  }
  onSubmit() {
    const CV = {
      firstName: this.cvForm.value.firstName,
      lastName: this.cvForm.value.lastName,
      dateOfBirth: this.cvForm.value.dateOfBirth,
      phone: this.cvForm.value.phone,
      address: this.cvForm.value.address,
      education: this.cvForm.value.education,
      experiences: this.cvForm.value.experiences,
      skills: this.skills,
      url: this.url
    };
    console.log(CV);
  }
  onImageSelected(event:any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e:any) => {
        this.url = e.target.result;
      }
    }

  }
  createEducation(): FormGroup {
    return this.fb.group({
      domain: [],
      degree: [],
      schoolName: [],
      startYear: [],
      endYear: [],
    });
  }
  addNextEducation(): void {
    (this.cvForm.get('education') as FormArray).push(this.createEducation());
  }

  createExperiences(): FormGroup {
    return this.fb.group({
      jobTitle: [],
      company: [],
      description: [],
      startYear: [],
      endYear: [],
    });
  }
  addNextExperience(): void {
    (this.cvForm.get('experiences') as FormArray).push(this.createExperiences());
  }
  getControls(name: string) {
    return (this.cvForm.get(`${name}`) as FormArray).controls;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // add the skill
    if (value) {
      this.skills.push({ skill: value });
    }

    // clear the skill forms
    event.chipInput!.clear();
  }

  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
