import { Factory, Seeder } from "typeorm-seeding";

import { Team, Match, Tournament } from "../../entities";

function getRandomArbitrary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const teams = await factory(Team)().createMany(30);
    const tournaments = await factory(Tournament)().createMany(30);
    let matchIndex = 0
    await factory(Match)()
      .map(async (match) => {
        const randomNum = getRandomArbitrary(0, 30)
        match.awayTeam = teams[(matchIndex * 2) + 1];
        match.homeTeam = teams[(matchIndex * 2) + 2];
        match.tournament = tournaments[randomNum]
        matchIndex ++
        return match;
      })
      .createMany(10);
  }
}