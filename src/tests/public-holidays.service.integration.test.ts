import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../services/public-holidays.service';

describe('testing services by integration', () => {
  it('should return public holidays list (getListOfPublicHolidays)', async () => {
    const response = await getListOfPublicHolidays(2023, 'GB');

    expect(response).not.toEqual(undefined);
    expect(response.length).toBeGreaterThan(0);
  });

  it('should return not undefined response (checkIfTodayIsPublicHoliday)', async () => {
    expect(await checkIfTodayIsPublicHoliday('GB')).not.toEqual(undefined);
  });

  it('should return next public holidays list (getNextPublicHolidays)', async () => {
    const response = await getNextPublicHolidays('GB');

    expect(response).not.toEqual(undefined);
    expect(response.length).toBeGreaterThan(0);
  });
});
