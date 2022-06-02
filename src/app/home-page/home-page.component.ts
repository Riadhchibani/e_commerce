import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CardProductComponent } from './card-product/card-product.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  @Input() usernameOutput: string = '';
  @Input() productOutput: Boolean = false;
  @Input() offerOutput: Boolean = false;
  @Input() demandOutput: Boolean = false;

  showFiller = true;
  
  constructor(private routerService: ActivatedRoute, private user: UserService) { }

  nextPage() {
    console.log("nextPage");
  }

  p: any;
  data: any = [];
  getData() {
    this.user.getData().subscribe(
      (data) => {
        this.data = data;
        console.log(this.data)
      }
    );
  }

  ngOnInit(): void {
    this.getData();
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

}
