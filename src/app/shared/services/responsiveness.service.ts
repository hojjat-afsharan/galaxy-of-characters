import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export enum BreakpointEnum {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

@Injectable({
  providedIn: 'root'
})
export class ResponsivenessService implements OnDestroy {

  private breakpoint$ = new Subject<BreakpointEnum>();
  public breakpointObservable$ = this.breakpoint$.asObservable();

  private resizeObserver = new ResizeObserver(entries => {

    const contentWidth = entries[0].contentRect.width;
    let breakpoint: BreakpointEnum;
    if (contentWidth < 576) {
      breakpoint = BreakpointEnum.SM;
    } else if (contentWidth < 768) {
      breakpoint = BreakpointEnum.MD;
    } else if (contentWidth < 992) {
      breakpoint = BreakpointEnum.LG;
    } else {
      breakpoint = BreakpointEnum.XL;
    }
    this.breakpoint$.next(breakpoint);
  });

  private breakpoints = [
    { name: BreakpointEnum.SM, minWidth: 0, maxWidth: 575 },
    { name: BreakpointEnum.MD, minWidth: 576, maxWidth: 767 },
    { name: BreakpointEnum.LG, minWidth: 768, maxWidth: 991 },
    { name: BreakpointEnum.XL, minWidth: 992 }
  ];

  constructor() {
    this.resizeObserver.observe(window.document.body);
    this.checkBreakpoint();
  }

  private checkBreakpoint() {
    const contentWidth = window.innerWidth;
    let breakpoint: BreakpointEnum = BreakpointEnum.MD;
    this.breakpoints.forEach(b => {
      if (b.minWidth <= contentWidth && (!b.maxWidth || b.maxWidth >= contentWidth)) {
        breakpoint = b.name;
      }
    });
    this.breakpoint$.next(breakpoint);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
