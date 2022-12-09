import sqlConfig from './src/config/database'

export default {
  ...sqlConfig,
  // These two lines have been added:
  seeds: ["src/db/seeding/seeds/**/*{.ts,.js}"],
  factories: ["src/db/seeding/factories/**/*{.ts,.js}"],
};