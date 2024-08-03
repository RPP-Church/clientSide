import Input from 'antd/es/input/Input';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';
import { SearchBAR } from '../../../../style/container';

const SearchBar = styled.div`
  ${SearchBAR}
`;
const SearchBars = ({ setState, state, refetch }) => {
  const handleReset = () => {
    setState((p) => ({
      ...p,
      query: {
        size: 10,
        page: 1,
        firstName: '',
        lastName: '',
        phone: '',
        category: '',
        gender: '',
      },
    }));
  };
  return (
    <SearchBar>
      <div>
        <label>SERVICE NAME</label>
        <Input.Search
          type='text'
          name='serviceName'
          placeholder='Search by Service Name'
          size='large'
          onChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                serviceName: e.target.value,
              },
            }))
          }
          value={state.query.serviceName}
        />
      </div>
      <div>
        <label>DATE</label>
        <Input.Search
          //   value={state.query.lastName}
          type='text'
          name='lastName'
          placeholder='Search by LastName'
          size='large'
          //   onChange={(e) =>
          //     setState((p) => ({
          //       ...p,
          //       query: {
          //         ...p.query,
          //         lastName: e.target.value,
          //       },
          //     }))
          //   }
        />
      </div>

      <div className='buttons'>
        <Button
          text={'Search'}
          color={'white'}
          background={'#059212'}
          radius={'2px'}
          padding={'10px 15px'}
          onClick={() => refetch()}
        />
        <Button
          text={'Reset'}
          color={'white'}
          background={'#EE4E4E'}
          radius={'2px'}
          padding={'10px 15px'}
          onClick={handleReset}
        />
      </div>
    </SearchBar>
  );
};

export default SearchBars;

SearchBars.propTypes = {
  setState: propTypes.func,
  state: propTypes.object,
  refetch: propTypes.func,
};
