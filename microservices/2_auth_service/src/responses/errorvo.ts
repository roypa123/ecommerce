class ErrorVO {
  status_code: number;
  status: string;
  message: string;
  errors: string[];

  constructor(status_code: number, status: string, message: string, errors: string | string[]) {
    this.status_code = status_code;
    this.status = status;
    this.message = message;
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

export default ErrorVO;
