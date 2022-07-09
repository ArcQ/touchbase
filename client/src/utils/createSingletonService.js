const singleton = {
  isInit: false,
  init() {
    if (!this.isInit) {
      this.isInit = true;
      this.start();
    }
  },
};

const createSingletonService = stubService => ({
  ...singleton,
  ...stubService,
});

export default createSingletonService;
