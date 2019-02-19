import {
  formatForecastList,
  formatDayList,
  convertFromKelvin,
  getIcon,
  getLikelyWeather
} from './utilities';

describe('Utility functions', () => {
  describe('formatForecastList', () => {
    it('is a function', () => {
      expect(typeof formatForecastList).toBe('function');
    });
    it('returns array of correct length', () => {
      expect(formatForecastList([]).length).toBe(6);
    });
  });
  describe('formatDayList', () => {
    it('is a function', () => {
      expect(typeof formatDayList).toBe('function');
    });
    it('returns array of correct length', () => {
      expect(formatDayList([[], [], [], [], []]).length).toBe(5);
    });
  });
  describe('convertFromKelvin', () => {
    it('is a function', () => {
      expect(typeof convertFromKelvin).toBe('function');
    });
    it('converts temperature', () => {
      expect(convertFromKelvin(276.25)).toBe(37);
    });
    it('converts temperature', () => {
      expect(convertFromKelvin(233.5)).toBe(-40);
    });
    it('converts temperature', () => {
      expect(convertFromKelvin(272.754625)).toBe(31);
    });
    it('converts temperature', () => {
      expect(convertFromKelvin(272.41625)).toBe(30);
    });
  });
  describe('getIcon', () => {
    it('is a function', () => {
      expect(typeof getIcon).toBe('function');
    });

    it('returns sun icon', () => {
      expect(getIcon('6:15', { description: 'clear sky' })).toBe('sun');
    });
    it('returns moon icon', () => {
      expect(getIcon('3:15', { description: 'clear sky' })).toBe('moon');
    });
    it('returns cloud-sun icon', () => {
      expect(getIcon('6:15', { description: 'scattered clouds' })).toBe(
        'cloud-sun'
      );
    });
    it('returns cloud-rain icon', () => {
      expect(getIcon('6:15', { description: 'light rain' })).toBe('cloud-rain');
    });
    it('returns snowflake icon', () => {
      expect(getIcon('12:15', { description: 'light snow' })).toBe('snowflake');
    });
    it('returns cloud icon', () => {
      expect(getIcon('9:15', { description: 'overcast clouds' })).toBe('cloud');
    });
    it('returns cloud-moon icon', () => {
      expect(getIcon('21:15', { description: 'few clouds' })).toBe(
        'cloud-moon'
      );
    });
    it('returns undefined for unhandled icon type', () => {
      expect(getIcon('21:15', { description: '' })).toBe(undefined);
    });
  });
  describe('getLikelyWeather', () => {
    it('is a function', () => {
      expect(typeof getLikelyWeather).toBe('function');
    });

    it('returns clear sky', () => {
      const weatherArray = [
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] }
      ];
      expect(getLikelyWeather(weatherArray)).toBe('clear sky');
    });
    it('returns clear sky', () => {
      const weatherArray = [
        { weather: [{ description: 'light rain' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'light rain' }] }
      ];
      expect(getLikelyWeather(weatherArray)).toBe('clear sky');
    });
    it('returns light snow', () => {
      const weatherArray = [
        { weather: [{ description: 'light snow' }] },
        { weather: [{ description: 'light snow' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'light snow' }] },
        { weather: [{ description: 'clear sky' }] }
      ];
      expect(getLikelyWeather(weatherArray)).toBe('light snow');
    });
    it('returns scattered clouds', () => {
      const weatherArray = [
        { weather: [{ description: 'scattered clouds' }] },
        { weather: [{ description: 'scattered clouds' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'few clouds' }] },
        { weather: [{ description: 'light rain' }] }
      ];
      expect(getLikelyWeather(weatherArray)).toBe('scattered clouds');
    });
    it('returns overcast clouds', () => {
      const weatherArray = [
        { weather: [{ description: 'light rain' }] },
        { weather: [{ description: 'few clouds' }] },
        { weather: [{ description: 'overcast clouds' }] },
        { weather: [{ description: 'clear sky' }] },
        { weather: [{ description: 'overcast clouds' }] }
      ];
      expect(getLikelyWeather(weatherArray)).toBe('overcast clouds');
    });
  });
});
