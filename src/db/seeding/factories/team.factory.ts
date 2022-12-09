import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Team } from "../../entities/team";

define(Team, (faker: typeof Faker) => {
  const team = new Team();
  team.name = faker.company.companyName();
  return team;
});