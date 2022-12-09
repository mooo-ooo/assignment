import request from 'supertest';
import express from 'express'
import Router from "../../routes";
import * as matchRepository from './match.repository'
export const app = express();

describe('GET /matches', () => {
  it('Request /matches should return an array and total!', async () => {
    const mockData = [
      {
        "id": 2,
        "date": "2022-09-18T04:33:13.000Z",
        "scoredHomeTeam": 0,
        "scoredAwayTeam": 0,
        "homeTeam": {
          "id": 5,
          "name": "Breitenberg, Fahey and Pouros",
        },
        "awayTeam": {
          "id": 4,
          "name": "Stark, Christiansen and Towne",
        },
        "tournament": {
          "id": 6,
          "name": "Credit Card Account",
        }
      }
    ]
    jest.spyOn(matchRepository, 'getMatches')
	    .mockImplementationOnce(async () => {
        return [mockData as any, 6]
      })
    const result = await request(app.use(Router)).get('/matches?date=2022-09-18%2009:05:13&size=10&page=0').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toStrictEqual(mockData);
    expect(result.body.total).toBe(6);
  });

  it('Request /matches/availabilities should return an array!', async () => {
    jest.spyOn(matchRepository, 'getAvailabilities')
	    .mockImplementationOnce(async () => {
        return [{
          uniqueDate: 'foo',
        }, {
          uniqueDate: 'bar',
        }]
      })
    const result = await request(app.use(Router)).get('/matches/availabilities?date=2022-06-04 09:05:13').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toStrictEqual(['foo', 'bar']);
  });
});