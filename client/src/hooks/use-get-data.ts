import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HttpMethods } from '../constants';

interface UseGetData <T> {
  request: (url: string, method?: string, body?: Record<string, string>, headers?: HeadersInit) => Promise<any>,
  url: string;
  method: HttpMethods;
  defaultValue?: T;
  body?: Record<string, string>;
  headers?: HeadersInit;
  dependencies?: string;
}

export const useGetData = <T>({
  request,
  url,
  method,
  body,
  headers,
  defaultValue,
  dependencies,
}: UseGetData<T>): [T, () => void] => {
  const [dependenciesUpdate, setDependenciesUpdate] = useState(false);
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const getData = async () => {
      const responseData = await request(url, method, body, headers);

      setData(responseData);
    };

    getData();
  }, [dependenciesUpdate, dependencies]);

  const onDependenciesUpdate = () => {
    setDependenciesUpdate((prev) => !prev);
  };

  return [data, onDependenciesUpdate];
};
