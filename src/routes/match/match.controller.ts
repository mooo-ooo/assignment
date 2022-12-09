
import { Get, Route, Path, Query } from "tsoa";
import { Match } from '../../db/entities'
import { getMatches, getAvailabilities } from "./match.repository"

interface IGetMatchesResp {
  data: Match[],
  total: number
}

@Route("matches")
export default class MatchController {
  @Get("/")
  public async getMatches(
    @Query() date: string,
    @Query() page: number,
    @Query() size: number
  ): Promise<IGetMatchesResp> {
    const [data, total] = await getMatches({
      page, size, date
    })
    return {
      data, total
    }
  }

  @Get("/availabilities")
  public async getAvailabilities(
    @Query() date: string,
  ): Promise<{ data: string[] }> {
    console.log({date})
    const resp = await getAvailabilities(date)
    return {
      data: resp.map(({ uniqueDate }) => uniqueDate)
    }
  }
}