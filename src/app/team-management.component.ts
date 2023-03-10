import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TeamManagementService } from './team-management.service';

@Component({
	selector: 'app-team',
	templateUrl: './team-management.component.html'
})
export class TeamManagementComponent implements OnInit {
	data:any
mull: any;
	submitted: boolean;
	constructor(
		private formBuilder: FormBuilder ,
		private teamMngService: TeamManagementService) {
	}
	ngOnInit() {
	}
   nameRegex='^[a-zA-Z][a-zA-Z0-9]*$';
	teamForm = this.formBuilder.group({
		teamName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
		noOfEmp: ['', [Validators.required, Validators.min(10)]],
		teamLead: this.formBuilder.group({
			empName: ['', Validators.required],
			age: ['', [Validators.required, Validators.min(18)]],
			city: ['', Validators.required]
		}),
		department: this.formBuilder.group({
			deptHead: ['', Validators.required],
			deptName: ['', Validators.required]
		}),
		classification: this.formBuilder.group({
			
			which_department: ['', Validators.required],
			Department_principal_Name: ['', Validators.required]
		})
	});
	get teamName() {
		return this.teamForm.get('teamName') as FormControl;
	}
	get noOfEmp() {
		return this.teamForm.get('noOfEmp') as FormControl;
	}
	get teamLead() {
		return this.teamForm.get('teamLead') as FormGroup;
	}
	get department() {
		return this.teamForm.get('department') as FormGroup;
	}
	get classification() {
		return this.teamForm.get('classification') as FormGroup;
	}
	onFormSubmit() {
		this.submitted = true;
		if (this.teamForm.valid) {
			console.log(this.teamForm.value);
		this.teamMngService.saveTeam(this.teamForm.value)
	       this.teamForm.reset();
		}
	}
}