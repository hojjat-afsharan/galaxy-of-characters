export interface State {
  totalRecords: number;
  totalPages: number;
  previous: string | null;
  next: string | null;
  currentPage: number;
  itemsLimit: number;
  currentSelectedCharacter: number;
  uidList: number[];
}

export const STATE_INITIAL_VALUE: State = {
  totalRecords: 10,
  totalPages: 1,
  previous: null,
  next: null,
  currentPage: 1,
  itemsLimit: 10,
  currentSelectedCharacter: 1,
  uidList: []
};
