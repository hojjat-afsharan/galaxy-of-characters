import { PeopleService } from "./people.service";
import { describe, test, beforeEach, expect} from '@jest/globals';
import { of } from "rxjs";

describe('PeopleService', () => {

    let service: PeopleService;
    let stateServiceMocked: any;
    let dataService: any;

    beforeEach(() => {
        stateServiceMocked = {};
        dataService = {};
        service = new PeopleService(stateServiceMocked, dataService);
    });  

    test('should create', () => {
        expect(service).toBeDefined();
    });

    test('should getPeople() return an Observable of type People[]', () => {

        dataService.fetchPeople = jest.fn().mockReturnValue(of({}));

        service.getPeople().subscribe((data) => 
        expect(Array.isArray(data)).toBeTruthy)
    })
    
})