import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  showCode = false;
  email = "";
  code = "";
  showErrorEmail = false;
  textErrorEmail = "";
  textErrorCode = "";
  showErrorCode = false;
  showSpinner = false;

  constructor() { }

  ngOnInit(): void {
  }

}
