import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../services/public-holidays.service';
import { holidaysList2023, nextPublicHolidays } from './mock';
import { PublicHolidayStatus } from '../helpers';


describe('testing services by mock', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  const url_2023GB = 'https://date.nager.at/api/v3/PublicHolidays/2023/GB';

  it('should return public holidays list (getListOfPublicHolidays)', async () => {
    mock.onGet(url_2023GB).reply(200, holidaysList2023);

    const response = await getListOfPublicHolidays(2023, 'GB');

    expect(response).toEqual(holidaysList2023);
  });
  it('should call API with proper arguments (getListOfPublicHolidays)', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: holidaysList2023 }));

    await getListOfPublicHolidays(2023, 'GB');

    expect(axiosGetSpy).toHaveBeenCalledWith(url_2023GB);
  });
  it('should return empty array if year or country are invalid (getListOfPublicHolidays)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ data: holidaysList2023 }));

    expect(await getListOfPublicHolidays(2023, 'GB')).toEqual([]);
  });

  it('should return today is a public holiday (checkIfTodayIsPublicHoliday)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
      status: PublicHolidayStatus.TODAY_IS_A_PUBLIC_HOLIDAY,
    }));

    const response = await checkIfTodayIsPublicHoliday('GB');

    expect(response).toBeTruthy();
  });
  it('should return today is not a public holiday (checkIfTodayIsPublicHoliday)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
      status: PublicHolidayStatus.TODAY_IS_NOT_A_PUBLIC_HOLIDAY,
    }));

    const response = await checkIfTodayIsPublicHoliday('GB');

    expect(response).toBeFalsy();
  });
  it('should return false if throw error (checkIfTodayIsPublicHoliday)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({
      status: PublicHolidayStatus.TODAY_IS_A_PUBLIC_HOLIDAY,
    }));

    expect(await checkIfTodayIsPublicHoliday('GB')).toBeFalsy();
  });

  it('should return next public holidays list (getNextPublicHolidays)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: nextPublicHolidays }));

    const response = await getNextPublicHolidays('GB');

    expect(response).toEqual(nextPublicHolidays);
  });
  it('should return empty array if throw error (getNextPublicHolidays)', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ data: nextPublicHolidays }));

    expect(await getNextPublicHolidays('GB')).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
