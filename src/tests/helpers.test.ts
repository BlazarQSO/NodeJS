import MockData from 'mockdate';
import { validateCountry, validateYear, validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday } from '../types';

describe('testing helpers', () => {
  it('should enter valid country (validateCountry)', () => {
    expect(validateCountry('GB')).toBeTruthy();
  });
  it('should enter invalid country (validateCountry)', () => {
    expect(validateCountry('GG')).toBeFalsy();
  });

  it('should enter valid year (validateYear)', () => {
    MockData.set('9/9/2023');
    expect(validateYear(2023)).toBeTruthy();
    MockData.reset();
  });
  it('should enter invalid country (validateYear)', () => {
    expect(validateYear(9999)).toBeFalsy();
  });

  it('should enter valid year and country (validateInput)', () => {
    expect(validateInput({ year: 2023, country: 'GB' })).toBeTruthy();
  });
  it('should enter invalid year (validateInput)', () => {
    try {
      (validateInput({ year: 9999, country: 'GB' }))
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Year provided not the current, received: 9999');
    }
  });
  it('should enter invalid country (validateInput)', () => {
    try {
      (validateInput({ year: 2023, country: 'GG' }))
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Country provided is not supported, received: GG');
    }
  });

  it('should shorten public holiday object (shortenPublicHoliday)', () => {
    const holiday: PublicHoliday = {
      date: '2023-08-28',
      localName: 'Summer Bank Holiday',
      name: 'Summer Bank Holiday',
      countryCode: 'GB',
      fixed: false,
      global: false,
      counties: [ 'GB-ENG', 'GB-WLS', 'GB-NIR' ],
      launchYear: 1971,
      types: [ 'Public' ]
    }

    expect(shortenPublicHoliday(holiday)).toEqual({
      name: 'Summer Bank Holiday',
      localName: 'Summer Bank Holiday',
      date: '2023-08-28',
    });
  });
});
