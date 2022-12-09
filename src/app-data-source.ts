import "reflect-metadata"
import { DataSource } from "typeorm"
import sqlConfig from './config/database'

export const myDataSource = new DataSource(sqlConfig)