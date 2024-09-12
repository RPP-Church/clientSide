import { useSearchParams } from 'react-router-dom';

const QueryParameter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (name, data) => {
    setSearchParams((searchParams) => {
      searchParams.set(name, data);
      return searchParams;
    });
  };
  return { searchParams, setSearchParams, handleSearchParams };
};

export default QueryParameter;
