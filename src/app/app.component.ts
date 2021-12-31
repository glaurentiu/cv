import { Component, OnInit } from '@angular/core';
import { Achievements } from './interfaces/achievements';
import { Experiences } from './interfaces/experiences';
import { Person } from './interfaces/person';
import { Skills } from './interfaces/skills';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { DocumentCreator } from './cv-generator';
import { Education } from './interfaces/education';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  clicked = false;
  url = '';
  title = 'CV';
  person?: Person;
  experiences?: Experiences[];
  achievements?: Achievements[];
  skills = [{ skill: 'JavaScript' }];
  cvForm: FormGroup = new FormGroup({});
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  CV = {
    personal: { firstName: '', lastName: '', address: '', dateOfBirth: '' },
    education: [],
    experiences: [],
    skills: [{ skill: '' }],
    url: '',
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.url = './assets/image.png';
    this.initializeForm();
  }

  saveButton(submitBtn:any){
    this.clicked=true;
     return submitBtn.click()

  }

  initializeForm(): void {
    this.cvForm = this.fb.group({
      personal : this.createPersonal(),
      education: this.fb.array([this.createEducation()]),
      experiences: this.fb.array([this.createExperiences()]),
    });
  }
  onSubmit() {
    this.CV = {
      personal: this.cvForm.value.personal,
      education: this.cvForm.value.education,
      experiences: this.cvForm.value.experiences,
      skills: this.skills,
      url: this.url,
    };
    console.log('acest cv',this.CV);

  }
  onImageSelected(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
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

  createPersonal(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      address: '',
      dateOfBirth: '',
      phone: '',
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
    (this.cvForm.get('experiences') as FormArray).push(
      this.createExperiences()
    );
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

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      this.CV.personal,
      this.CV.experiences,
      this.CV.education,
      this.CV.skills,
      this.CV.url
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(
        blob,
        `${this.CV.personal.firstName}-${this.CV.personal.lastName}.docx`
      );
      console.log('CV creat cu succes');
    });
  }
}
