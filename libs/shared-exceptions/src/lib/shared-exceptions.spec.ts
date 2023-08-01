import { sharedExceptions } from './shared-exceptions';

describe('sharedExceptions', () => {
  it('should work', () => {
    expect(sharedExceptions()).toEqual('shared-exceptions');
  });
});
