export interface State {
  totalRecords: number;
  totalPages: number;
  previous: string | null;
  next: string | null;
  currentPage: number;
  pageLimit: number;
  currentSelectedCharacter: number;
}

export const STATE_INITIAL_VALUE: State = {
  totalRecords: 5,
  totalPages: 1,
  previous: null,
  next: null,
  currentPage: 1,
  pageLimit: 1,
  currentSelectedCharacter: 1
};
