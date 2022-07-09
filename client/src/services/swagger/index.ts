/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '/api/v1';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class MeService {
  /**
   *
   */
  static meNftList(
    params: {
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meNftCreate(
    params: {
      /**  */
      data: Nft;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Nft> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meNftRead(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Nft> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meNftUpdate(
    params: {
      /**  */
      data: Nft;
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Nft> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meNftPartialUpdate(
    params: {
      /**  */
      data: Nft;
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Nft> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meNftDelete(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/nft/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersList(
    params: {
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersCreate(
    params: {
      /**  */
      data: AppUser;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersRead(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersUpdate(
    params: {
      /**  */
      data: AppUser;
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersPartialUpdate(
    params: {
      /**  */
      data: AppUser;
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['data'];

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersDelete(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static meUsersSetEmailVerified(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/me/users/{id}/set_email_verified/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class NftService {
  /**
   *
   */
  static nftList(
    params: {
      /**  */
      uuid?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/nft/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { uuid: params['uuid'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static nftRead(
    params: {
      /** id */
      uuid: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Nft> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/nft/{uuid}/';
      url = url.replace('{uuid}', params['uuid'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export class UsersService {
  /**
   *
   */
  static usersList(
    params: {
      /**  */
      username?: string;
      /** A page number within the paginated result set. */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { username: params['username'], page: params['page'] };
      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static usersRead(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PublicAppUser> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{id}/';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      let data = null;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface Nft {
  /**  */
  id?: number;

  /**  */
  created?: Date;

  /**  */
  modified?: Date;

  /**  */
  assetUrl?: string;

  /**  */
  assetUrlFb?: string;

  /**  */
  name: string;

  /**  */
  description?: string;

  /**  */
  startDate?: Date;

  /**  */
  expiryDate: Date;

  /**  */
  totalMinted: number;

  /**  */
  contractId?: number;

  /**  */
  uuid?: string;
}

export interface AppUser {
  /**  */
  username: string;

  /**  */
  email?: string;

  /**  */
  photoUrl?: string;

  /**  */
  isOnboarding?: boolean;

  /**  */
  firebaseUid?: string;

  /**  */
  providerId?: string;

  /**  */
  userType?: EnumAppUserUserType;
}

export interface PublicAppUser {
  /**  */
  username: string;

  /**  */
  email?: string;

  /**  */
  photoUrl?: string;
}
export enum EnumAppUserUserType {
  'company' = 'company',
  'user' = 'user'
}
