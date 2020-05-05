/* eslint-disable import/extensions */
import app from '../src/App.js';

describe('app module', () => {
  test('it exists', async () => {
    expect(app).toBeDefined();
  });

  test('it returns program name with SDGs', async () => {
    const result = app();

    const sdgPos = (result || '').indexOf('SDG');
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });
});
