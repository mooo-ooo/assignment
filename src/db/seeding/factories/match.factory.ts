import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Match } from "../../entities/match";

define(Match, (faker: typeof Faker) => {
  const match = new Match();
  match.date = faker.date.past();
  return match;
});