import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('search') searchinput!: ElementRef

  background: boolean = true
  background1: boolean = false
  background2: boolean = false
  background3: boolean = false

  displayInput() {
    this.searchinput.nativeElement.style.display = 'block'
  }


}
