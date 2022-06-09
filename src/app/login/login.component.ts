import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/Consumer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  consumer !: Consumer;
  constructor(private consumerService: ConsumerService, private router: Router) { }

  ngOnInit(): void { }

  login(username: string, password: string) {
    console.log(username, password);
    this.consumerService.login(username, password).subscribe(
      data => {
        console.log(data);
        console.log(data);
        this.consumer = data;
        console.log(this.consumer);
        localStorage.setItem("consumer", JSON.stringify(data));
        this.router.navigate([`home/${this.consumer.firstName}`])
      }
    );
  }

}
