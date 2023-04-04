import { describe, test, beforeEach, expect } from "@jest/globals";
import {
  BreakpointEnum,
  ResponsivenessService,
} from "./responsiveness.service";

describe("ResponsivenessService", () => {
  let service: ResponsivenessService;
  let mockBreakpointObserver: any;

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  beforeEach(() => {
    mockBreakpointObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    jest
      .spyOn(window, "ResizeObserver")
      .mockImplementation(() => mockBreakpointObserver);
    service = new ResponsivenessService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe('breakpointObservable$', () => {
    it('should be an Observable', () => {
      expect(service.breakpointObservable$).toBeDefined();
      expect(service.breakpointObservable$).toEqual(expect.any(Object));
    });
  });


  test("should emit breakpoint changes", () => {
    const breakpoints: BreakpointEnum[] = [
      BreakpointEnum.SM,
      BreakpointEnum.MD,
      BreakpointEnum.LG,
      BreakpointEnum.XL,
    ];

    let i = 0;

    service.breakpointObservable$.subscribe((breakpoint: BreakpointEnum) =>
      expect(breakpoint).toBe(breakpoints[i++])
    );

    window.dispatchEvent(new Event("resize"));
  });
});
