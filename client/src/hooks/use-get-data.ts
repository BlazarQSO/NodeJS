import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HttpMethods } from '../constants';

interface UseGetData <T> {
  request: (url: string, method?: string, body?: Record<string, string>, headers?: HeadersInit) => Promise<any>,
  url: string;
  method: HttpMethods;
  defaultValue?: T;
  body?: Record<string, string>;
  headers?: HeadersInit;
}

export const useGetData = <T>({
  request,
  url,
  method,
  body,
  headers,
  defaultValue,
}: UseGetData<T>): [T, () => void] => {
  const [dependenciesUpdate, setDependenciesUpdate] = useState(false);
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const getData = async () => {
      setTimeout(async () => {
        const responseData = await request(url, method, body, headers);

        setData(responseData);
      }, 1000);
    };

    getData();
  }, [dependenciesUpdate]);

  const onDependenciesUpdate = () => {
    setDependenciesUpdate((prev) => !prev);
  };

  return [data, onDependenciesUpdate];
};
