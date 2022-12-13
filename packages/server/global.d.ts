declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_PORT: string;
      SERVER_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
