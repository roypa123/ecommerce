class ResponseVO {
  status_code: number;
  status: string;
  message: string;
  data: any;

  constructor(status_code: number, status: string, message: string, data: any) {
    this.status_code = status_code;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ResponseVO;
