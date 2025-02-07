class RequestVO {
  data: any;
  pagination?: any;
  filter?: any;
  sortBy?: any;
  orderBy?: string;
  skipWarning: boolean;

  constructor({
    data,
    pagination,
    filter,
    sortBy,
    orderBy,
    skipWarning = false,
  }: {
    data: any;
    pagination?: any;
    filter?: any;
    sortBy?: any;
    orderBy?: string;
    skipWarning?: boolean;
  }) {
    this.data = data;
    this.pagination = pagination;
    this.filter = filter;
    this.sortBy = sortBy;
    this.orderBy = orderBy;
    this.skipWarning = skipWarning;
  }
}

export default RequestVO;
