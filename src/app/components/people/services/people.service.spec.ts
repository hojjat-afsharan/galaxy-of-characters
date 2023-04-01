import { PeopleService } from "./people.service";
import { describe, test, beforeEach, expect} from '@jest/globals';

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
    })
})