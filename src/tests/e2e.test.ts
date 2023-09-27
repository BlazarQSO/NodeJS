import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('Public holidays API', () => {
  describe('/PublicHolidays', () => {
    it('should return 200 and public holidays for the indicated year', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2023/GB');

      expect(status).toEqual(200);
      expect(body.length).toBeGreaterThan(0);
      expect(body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
        }),
       ]));
    });
  });

  describe('/NextPublicHolidays', () => {
    it('should return 200 and public holidays for next year', async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get('/NextPublicHolidays/GB');

      expect(status).toEqual(200);
      expect(body.length).toBeGreaterThan(0);
      expect(body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
        }),
       ]));
    });
  });
});
