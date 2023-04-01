import { PeopleService } from "./people.service";
import { describe, test, beforeEach, expect } from "@jest/globals";
import { of } from "rxjs";
import { People, PeoplePageParams } from "../models/people.model";

describe("PeopleService", () => {
  let service: PeopleService;
  let stateServiceMocked: any;
  let dataService: any;
  let mockPeople: People[] = [];

  beforeEach(() => {
    stateServiceMocked = {};
    dataService = {};
    service = new PeopleService(stateServiceMocked, dataService);
  });

  test("should create", () => {
    expect(service).toBeDefined();
  });

  describe("getPeople", () => {
    beforeEach(() => {
      mockPeople = [
        new People({
          uid: "1",
          name: "Luke Skywalker",
          url: "https://swapi.dev/api/people/1/",
        }),
        new People({
          uid: "2",
          name: "Leia Organa",
          url: "https://swapi.dev/api/people/5/",
        }),
        new People({
          uid: "3",
          name: "Han Solo",
          url: "https://swapi.dev/api/people/14/",
        }),
      ];

      dataService.fetchPeople = jest.fn().mockReturnValue(of(mockPeople));
    });

    test("should getPeople() return an Observable of type People[]", () => {
      service.getPeople().subscribe((data) => {
        expect(Array.isArray(data)).toBeTruthy;
        expect(data).toEqual(mockPeople);
      });
    });

    test("should receive data of type People after calling getData", () => {
      const params: PeoplePageParams = {
        page: 1,
        limit: 10,
      };

      service.getData(params);

      service.people$.subscribe((data: People[]) => {
        expect(data).toBeInstanceOf(People);
      });
    });
  });
});
