import dotenv from 'dotenv';

dotenv.config({});

class Config{
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined
  public SECRET_KEY_TWO: string | undefined
  public CLIENT_URL: string | undefined;

  constructor(){
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || ''
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || ''
    this.CLIENT_URL = process.env.CLIENT_URL || '';
  }

}

export const config: Config = new Config();
