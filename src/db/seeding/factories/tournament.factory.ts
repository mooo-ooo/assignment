import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Tournament } from "../../entities";

define(Tournament, (faker: typeof Faker) => {
  const tournament = new Tournament();
  tournament.name = faker.finance.accountName();
  return tournament;
});