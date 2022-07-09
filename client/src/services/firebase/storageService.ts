import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import { v4 } from 'uuid';

export type StorageServiceResponseContainer = {
  type: any;
  response: { ref: StorageReference; metadata: { fullPath: any } };
  additionalResponseArgs: any;
};

export const parseUploadResponse: (
  responseContainer: StorageServiceResponseContainer,
) => Promise<{
  type: string;
  url: string;
  urlFb: string;
}> = async responseContainer => ({
  type: responseContainer.type,
  url: await getDownloadURL(responseContainer.response.ref),
  urlFb: responseContainer.response.metadata.fullPath,
  ...responseContainer.additionalResponseArgs,
});

const storageService = {
  storage: undefined,
  init() {
    this.storage = getStorage();
  },
  _uploadSingle: async (topDir, assetsSlug, type, file) => {
    const path = assetsSlug
      ? `${topDir}/${assetsSlug}/${type}/${v4()}`
      : `${topDir}/${type}/${v4()}`;
    const storageRef = ref(storageService.storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot;
  },
  uploadSingleBase64: async (topDir, type, assetsSlug, file, additionalResponseArgs) => {
    const path = assetsSlug
      ? `${topDir}/${assetsSlug}/${type}/${v4()}`
      : `${topDir}/${type}/${v4()}`;
    const storageRef = ref(storageService.storage, path);
    const snapshot = await uploadString(storageRef, file, 'data_url');
    return snapshot;
  },
  uploadSingle: async (topDir, type, assetsSlug, file, additionalResponseArgs) => {
    const response = await storageService._uploadSingle(topDir, assetsSlug, type, file);
    return { response, type, additionalResponseArgs };
  },
  uploadMulti: async (topDir, type, assetsSlug, files, additionalResponseArgs) => {
    const filesArray = Array.from(files);
    const responses = await Promise.all(
      filesArray.map(file => storageService._uploadSingle(topDir, assetsSlug, type, file)),
    );
    return responses.map(response => ({ response, type, additionalResponseArgs }));
  },
  read: url => getDownloadURL(ref(storageService.storage, url)),
};

export default storageService;
