import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/Models/User';
import { UserService } from 'src/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {

  fileName = 'ExcelSheet.xlsx';

  users: User[] = [{
    Id: 0, IdUser: null, FirstName: null, LastName: null, DateBirth: null, Sex: null, HMO: null,
    Children: [],
    IsParent: true
  }];

  childBirthDateArry: Date[] = [];

  childNameArry: string[] = [];

  personalDetails = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    id: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
    birthDate: [new Date().toISOString().slice(0, 10), Validators.required],
    sex: [-1, Validators.required],
    HMO: [-1, Validators.required],
    children: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
    public userService: UserService,
    public router: Router,
  ) { }

  get children(): FormArray {
    return <FormArray>this.personalDetails.get('children');
  }

  get id() {
    return this.personalDetails.get('id').value;
  }

  get firstName() {
    return this.personalDetails.get('firstName').value;
  }

  get lastName() {
    return this.personalDetails.get('lastName').value;
  }

  get birthDate() {
    return this.personalDetails.get('birthDate').value;
  }

  get sex() {
    return this.personalDetails.get('sex').value;
  }

  get HMO() {
    return this.personalDetails.get('HMO').value;
  }

  ngOnInit(): void {
    if (this.userService.getFromStorage()) {
      this.users = this.userService.getFromStorage();
      let s = this.users[0]?.Sex == true ? 1 : this.users[0]?.Sex == false ? 0 : null;////
      this.personalDetails = this.fb.group({
        firstName: [this.users[0]?.FirstName, [Validators.required]],
        lastName: [this.users[0]?.LastName, [Validators.required]],
        id: [this.users[0]?.IdUser.toString(), [Validators.required, Validators.maxLength(9), Validators.minLength(7)]],
        birthDate: [new Date(this.users[0]?.DateBirth ? this.users[0].DateBirth : null).toISOString().slice(0, 10), [Validators.required]],
        sex: [s, [Validators.required]],
        HMO: [this.users[0]?.HMO, [Validators.required]],
        children: this.fb.array([])
      });
      for (let i = 1; i < this.users[0]?.Children.length + 1; i++) {
        this.children.push(this.fb.group({
          idChild: [this.users[i].IdUser.toString(), [Validators.required, Validators.maxLength(9), Validators.minLength(7)]],
          name: [this.users[i].FirstName, Validators.required],
          birthDateChild: [new Date(this.users[i].DateBirth ? this.users[i].DateBirth : null).toISOString().slice(0, 10), Validators.required]////
        }))
      }
      for (let i = 1; i < this.users[0]?.Children.length + 1; i++) {
        this.childBirthDateArry.push(new Date(this.users[i].DateBirth));
        this.childNameArry.push(this.users[i].FirstName);
      }
    }
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  setUsers() {
    this.users = [];
    this.childBirthDateArry = [];
    this.childNameArry = [];
    let s: boolean;
    if (this.sex == 1)
      s = true;
    else if (this.sex == 0)
      s = false;
    else s = null;
    let c: number[] = [];
    for (let i = 0; i < this.children.controls.length; i++) {
      c.push(Number(this.children.controls[i].value.idChild));
      this.childBirthDateArry.push(new Date(this.children.controls[i].value.birthDateChild));
      this.childNameArry.push(this.children.controls[i].value.name.toString());
    }
    if (c == null)
      c = [0];
    this.users[0] = {
      Id: 0, IdUser: Number(this.id), FirstName: this.firstName,
      LastName: this.lastName, DateBirth: new Date(this.birthDate), Sex: s, HMO: Number(this.HMO),
      Children: c,
      IsParent: true
    }
    for (let i = 0; i < this.children.controls.length; i++) {
      this.users.push(new User(0, c[i], this.childNameArry[i].toString(), this.users[0].LastName, new Date(this.childBirthDateArry[i]), false, 0, [0], false));
    }
  }

  createChild(): FormGroup {
    return this.fb.group({
      idChild: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(7)]],
      name: ['', Validators.required],
      birthDateChild: [new Date().toISOString().slice(0, 10), Validators.required]
    })
  }

  addChild() {
    this.children.push(this.createChild());
    this.users[0]?.Children.push(null);
  }

  getEHMO() {
    switch (this.HMO) {
      case 0:
        return "Macabi";
      case 1:
        return "Clalit";
      case 2:
        return "Meuchedet";
      case 3:
        return "Leumit";
      default: return "";
    }
  }

  onSubmit() {
    this.setUsers();
    for (let i = 0; i < this.users.length; i++) {
      this.userService.postUser(this.users[i]).subscribe(succ => {
        this.userService.currentUsers.next(this.users);
        this.userService.setInStorage(this.users)
        console.log("user in server" + succ)
      })
    }
    this.userService.getAllUser().subscribe(
      succ => {
        console.log("allUserfrom get" + succ);
      }
    )
    this.exportexcel()
    this.userService.removeFromStorage();
    this.users = [];
    this.childBirthDateArry = [];
    this.childNameArry = [];
    this.personalDetails = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      id: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      birthDate: [new Date().toISOString().slice(0, 10), Validators.required],
      sex: [-1, Validators.required],
      HMO: [-1, Validators.required],
      children: this.fb.array([])
    });
  }

  ngOnDestroy(): void {
    this.setUsers();
    this.userService.currentUsers.next(this.users);
    this.userService.setInStorage(this.users);
  }
}