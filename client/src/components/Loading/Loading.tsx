import React, { FC } from 'react';
import './Loading.scss';

interface LoadingProps {
  loading: boolean;
  children: JSX.Element | JSX.Element[] | string;
}

export const Loading: FC<LoadingProps> = ({ loading, children }: LoadingProps): JSX.Element => (
  <div>
    {
        loading
          ? <div className="loading">Loading...</div>
          : children
      }
  </div>
);
