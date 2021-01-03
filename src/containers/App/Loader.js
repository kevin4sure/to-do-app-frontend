
import React, { memo } from 'react';
import { Sugar } from 'react-preloaders';

const Loader = () => {
  return <Sugar background="#0d111f" color="#ffffff" />;
};

export default memo(Loader);
