const f = require('../handler');
const fs = require('fs');

describe('Handler', () => {
  it('should execute a smart contract', async () => {
    const event = JSON.parse(fs.readFileSync('./event.json'));
    const result = await f.ciceroTemplate(event);
    expect(result).toHaveProperty('state');
    expect(result).toHaveProperty('response');
    expect(result.response.discountRate).toEqual(2.8);
  });

  it('should catch an error', async () => {
    const result = await f.ciceroTemplate(null);
    expect(result).toHaveProperty('message');
  });
});
