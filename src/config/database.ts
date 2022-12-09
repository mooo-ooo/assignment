

import {DataSourceOptions} from 'typeorm'
import { Team, Match, Tournament } from '../db/entities'

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.SQL_HOST || "localhost",
  port: Number(process.env.SQL_PORT) || 3306,
  username: process.env.SQL_USER || "root",
  password: process.env.SQL_PASSWORD || "qwerty@123",
  database: process.env.SQL_DB || "thanos",
  entities: [Match, Team, Tournament],
  synchronize: true,
  // logging: true // to view query debug
}

export default config