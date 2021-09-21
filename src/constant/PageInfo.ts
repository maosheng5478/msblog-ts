export interface PageInfo<T> {
  total: number;
  list: Array<T>;
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nextPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  extPage: boolean;
  navigatePages: number;
  navigatepageNums: Array<number>;
  navigateFirstPage: number;
  navigateLastPage: number;
}
