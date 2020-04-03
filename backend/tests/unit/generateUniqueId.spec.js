const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate unique Id', () => {
  it('Should generate an unique Id', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});
