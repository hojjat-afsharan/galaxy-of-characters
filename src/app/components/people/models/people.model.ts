

  export class PeopleResponse {
    public ok: string;
    public next: string;
    public previous: string;
    public results: People[];
    public total_pages: number;
    public total_records: number;

    constructor(peopleResponse: PeopleResponse) {
        this.ok = peopleResponse.ok;
        this.next = peopleResponse.next;
        this.previous = peopleResponse.previous;
        this.results = peopleResponse.results;
        this.total_pages = peopleResponse.total_pages;
        this.total_records = peopleResponse.total_records;
    }
  }

  export class People {
    public uid: string;
    public name: string;
    public url: string;

    constructor(people: People) {
        this.uid = people.uid;
        this.name = people.name;
        this.url = people.url;
    }
  }


export interface PeoplePageParams {
  page: number,
  limit: number
}

export const DEFAULT_PEOPLE_LIST_PARAMS = {
  currentPage: 1,
  limit: 10
}
