import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {
    public isNavOpened = false;
    public subscription = new Subscription();
    private wasClickInside = false;

    @HostListener('click')
    clickInside() {
        this.wasClickInside = true;
    }
    @HostListener('document:click')
    clickout() {
        if (!this.wasClickInside) {
            this.isNavOpened = false;
        }
        this.wasClickInside = false;
    }

    constructor(private breakpointObserver: BreakpointObserver) {}

    public toggleNav(): void {
        this.isNavOpened = !this.isNavOpened;
    }

    public ngOnInit(): void {
        this.subscription = this.breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.XSmall
        ]).subscribe((state: BreakpointState) => {
            if (state.breakpoints[Breakpoints.XSmall]) {
                this.isNavOpened = false;
            }
        });
    }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
