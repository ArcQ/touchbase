import { MeService } from './swagger';

const onboardingService = {
  async getMyCompany() {
    try {
      //id doesn't matter, you only have one company right now, backend will get it for you
      const companyOnboarding = await MeService.meCompanyList();
      return companyOnboarding;
    } catch (error) {
      if (error.message.includes('Request failed with status code 404')) {
        return initialBackendState;
      }
    }
  },
};
