import React from 'react';
import Link from 'next/link';

import WithAuthWrapper from 'helpers/wrappers/WithAuthWrapper';

function Posts() {
  return (
    <div>
      <h2>
        Fetched at
        {JSON.stringify(new Date())}
      </h2>
      <Link href="/">Back to homepage</Link>
    </div>
  );
}

export default WithAuthWrapper(Posts);
