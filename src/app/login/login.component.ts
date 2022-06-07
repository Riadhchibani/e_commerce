import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/Consumer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private consumerService: ConsumerService) { }

  ngOnInit(): void {}

  login(username: string, password:string) {
    console.log(username, password);
    this.consumerService.login(username, password).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
