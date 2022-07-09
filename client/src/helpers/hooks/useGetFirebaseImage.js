import { useEffect, useState } from 'react';

import storageService from 'services/firebase/storageService';

const useGetFirebaseImage = (src, onLoad) => {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const getSignedUrl = async () => {
      const res = await storageService.read(src);
      setSigned(res);
      if (onLoad) {
        onLoad(res);
      }
    };
    getSignedUrl();
  }, []);
  return signed;
};

export default useGetFirebaseImage;
