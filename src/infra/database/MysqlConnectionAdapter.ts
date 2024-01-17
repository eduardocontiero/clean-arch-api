import DbConnection from "./DbConnection";
import mysql, { Connection } from "mysql2";

export default class MysqlConnectionAdapter implements DbConnection {


  mysql: Connection;


  constructor() {
    this.mysql = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'order_clean_arch'
    });
  }
  async query(statement: string, params: any[]): Promise<any> {

    return new Promise((resolve, reject) => {
      this.mysql.query<any>(statement, params, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

  }

}