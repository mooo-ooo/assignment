import { startOfDay, endOfDay, startOfMonth, endOfMonth, format } from 'date-fns';
import { Between } from "typeorm";
import { myDataSource } from "../../app-data-source";
import { Match } from '../../db/entities'

export interface IMatchPayload {
  date: Date;
}

export interface IGetMatchesPayload {
  date: string
  page: number
  size: number
}

export const getMatches = async (props: IGetMatchesPayload): Promise<[Array<Match>, number]> => {
  const { date, size, page } = props
  const matchRepository = myDataSource.getRepository(Match);
  const dayFiltered = new Date(date)

  return matchRepository.findAndCount({
    where: {
      date: Between(startOfDay(dayFiltered), endOfDay(dayFiltered)),
    },
    skip: page,
    take: size,
    relations: {
      homeTeam: true,
      awayTeam: true,
      tournament: true
    }
  })
}

export const getAvailabilities = async (date: string): Promise<{ uniqueDate: string }[]> => {
  const dayFiltered = new Date(date)
  const dateFormat = 'yyyy-MM-dd'
  const onlyDateString = (dateString: Date) => format(dateString, dateFormat)
  return myDataSource.manager.query('SELECT DISTINCT DATE_FORMAT(date, "%M %d %Y") AS "uniqueDate" FROM `match` ' + `WHERE date BETWEEN "${onlyDateString(startOfMonth(dayFiltered))} 00:00:00" AND "${onlyDateString(endOfMonth(dayFiltered))} 23:59:59"`)
}