import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private routerService: ActivatedRoute) { }

  ngOnInit(): void {
    this.usernameOutput = this.routerService.snapshot.params['username'];
  }

}
