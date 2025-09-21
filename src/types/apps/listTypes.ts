
export interface IDataList {
  data: any[];
  page: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
};

export const defaultDataList: IDataList = {
  page: 1, 
  pageSize: 7, 
  totalPages: 0,
  currentPage: 0,
  data: [],
}