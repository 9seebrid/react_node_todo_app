import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeleton = () => {
  return (
    <p className="flex w-1/3 flex-col p-4 justify-between">
      <span>
        <Skeleton width="40%" height="30px" />
      </span>
      <span>
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
      </span>
    </p>
  );
};

export default LoadingSkeleton;
