import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
    constructor() {
        console.log("Home page made");
    }

    ngOnInit(): void {
        console.log("Home page made");
    }
}
