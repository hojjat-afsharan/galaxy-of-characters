
import { describe, test, beforeEach, expect} from '@jest/globals';
import { catchError, of, throwError } from 'rxjs';
import { People, PeopleResponse } from '../models/people.model';
import { PeopleDataService } from './people-data.service';

describe('PeopleDataService', () => {

    let service: PeopleDataService;
    let httpClientSpy: {get: jest.Mock};

    beforeEach(() => {
        httpClientSpy = {get: jest.fn()};
        service = new PeopleDataService(httpClientSpy as any);
    });

    test('should be created', () => {
        expect(service).toBeTruthy();
    });

    test('should call the API with the correct URL', () => {
        const pageNumber = 1;
        const limit = 10;
        const expectedURL =  `https://www.swapi.tech/api/people?page=${pageNumber}&limit=${limit}`;
        httpClientSpy.get.mockReturnValue(of({}));

        service.fetchPeople(pageNumber, limit).subscribe();

        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });

    test('shold handle HTTP errors', () => {
        const pageNumber = 1;
        const limit = 10;
        const errorResponse = ({status: 404, statusText: 'Not Found'});
        httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));

        service.fetchPeople(pageNumber, limit).pipe(
            catchError((error) => {
                expect(error).toBe(errorResponse);
                return throwError(() => error);
            })
        ).subscribe();
    });

    test('should return response data', () => {
        const pageNumber = 1;
        const limit = 10;

        const mockPeople: People[] = [
            new People({ uid: '1', name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }),
            new People({ uid: '2', name: 'Leia Organa', url: 'https://swapi.dev/api/people/5/' }),
            new People({ uid: '3', name: 'Han Solo', url: 'https://swapi.dev/api/people/14/' }),
          ];
          
        const mockPeopleResponse: PeopleResponse = {
            ok: 'true',
            next: 'https://swapi.dev/api/people/?page=2',
            previous: '',
            results: mockPeople,
            total_pages: 1,
            total_records: 3
          };
        httpClientSpy.get.mockReturnValue(of(mockPeopleResponse));

        service.fetchPeople(pageNumber, limit).subscribe((response) => 
        expect<PeopleResponse>(response).toEqual(mockPeopleResponse));

    });
})