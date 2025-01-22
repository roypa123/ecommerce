import dotenv from 'dotenv';

dotenv.config({});

class Config{
  public GATEWAY_JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined
  public SECRET_KEY_TWO: string | undefined
  public CLIENT_URL: string | undefined;
  public AUTH_BASE_URL: string | undefined;

  constructor(){
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || ''
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || ''
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.AUTH_BASE_URL = process.env.AUTH_BASE_URL || '';
  }

}

export const config: Config = new Config();
