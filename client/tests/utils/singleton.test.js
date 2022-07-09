import createSingletonService from 'utils/createSingletonService';

describe('singleton', () => {
  test('using spread to extend functionality will only call start once', async () => {
    const stubService = {
      startedCalled: 0,
      start() {
        this.startedCalled += 1;
      },
    };
    const service = createSingletonService(stubService);
    service.init();
    service.init();
    expect(service.startedCalled).toBe(1);
  });
  test('using singleton only calls its own service', async () => {
    const stubService = {
      startedCalled: 0,
      start() {
        this.startedCalled += 1;
      },
    };

    const service = createSingletonService(stubService);
    const service2 = createSingletonService(stubService);
    service.init();
    expect(service.startedCalled).toBe(1);
    expect(service2.startedCalled).toBe(0);
  });
});
