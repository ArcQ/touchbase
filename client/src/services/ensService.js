import ENS, { getEnsAddress } from '@ensdomains/ensjs';

const ensService = {
  ens: null,
  init(provider) {
    if (this.ens !== null) return;
    this.ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
  },
  async lookupAddress(address) {
    const result = await ensService.ens.getName(address);
    return result?.name;
  },
  async resolveName(name) {
    return ensService.ens.name(name).getAddress();
  },
  async bulkLookupAddress(addresses) {
    if (!addresses || addresses.length === 0) return;
    return await Promise.all(
      addresses.slice(0, 50).map(async address => {
        const ensAddress = await ensService.lookupAddress(address);
        return {
          address,
          ensAddress: ensAddress || address,
        };
      }),
    );
  },
};

export default ensService;
