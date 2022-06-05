import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

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
  
  constructor(private routerService: ActivatedRoute, private productService: ProductService) { }

  nextPage() {
    console.log("nextPage");
  }

  p: any;
  data: any = [];
  getData() {
    this.productService.findAllPoduct().subscribe(
      (data) => {
        console.log(data)
        this.data = data;
      }
    );
  }

  ngOnInit(): void {
    this.getData();
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

}
