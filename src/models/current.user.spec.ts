import { CurrentUser } from './current.user';

describe('CurrentUser', () => {
  it('should be defined', () => {
    expect(new CurrentUser()).toBeDefined();
  });
});
