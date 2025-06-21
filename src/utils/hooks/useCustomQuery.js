import { useQuery } from '@tanstack/react-query';
import { getData, getOneData } from '../api/requests';

export const useGet = (key, endpoint) => {
  return useQuery({
    queryKey: [key], 
    queryFn: () => getData(endpoint),
    onError: (error) => {
      console.error(`Error fetching data: ${error.message || error}`);
    },
  
  });
};

export const useGetOne = (key, endpoint, slug) => {
  return useQuery({
    queryKey: [key, slug], 
    queryFn: () => getOneData(endpoint, slug),
    onError: (error) => {
      console.error(`Error fetching data: ${error.message || error}`);
    },
  });
};
