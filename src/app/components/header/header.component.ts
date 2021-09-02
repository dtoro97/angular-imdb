import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public isNavOpened = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.XSmall
    ]).subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
            this.isNavOpened = false;
        }
    });
   }

  public toggleNav(): void {
      this.isNavOpened = !this.isNavOpened;
  }

}
