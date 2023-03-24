import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

describe('DataService', () => {
  
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get data for the specified page and limit', () => {
    const apiUrl = `${environment.starWarsUrl}/people?page=3&limit=10`;
    const mockResponse = 
      [
        { name: 'Luke Skywalker', gender: 'male' },
        { name: 'Leia Organa', gender: 'female' }
      ]
    ;

    service.fetchPeople(3, 10).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
