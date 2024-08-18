import Input from 'antd/es/input/Input';
import styled from 'styled-components';
import Select from '../../../../components/Select';
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
        <label>FIRST NAME</label>
        <Input.Search
          type='text'
          name='firstName'
          placeholder='Search by FirstName'
          size='large'
          onChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                firstName: e.target.value,
                page: 1,
              },
            }))
          }
          value={state.query.firstName}
        />
      </div>
      <div>
        <label>LAST NAME</label>
        <Input.Search
          value={state.query.lastName}
          type='text'
          name='lastName'
          placeholder='Search by LastName'
          size='large'
          onChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                lastName: e.target.value,
                page: 1,
              },
            }))
          }
        />
      </div>
      <div>
        <label>PHONE</label>
        <Input.Search
          type='text'
          name='phone'
          placeholder='Search by Phone'
          size='large'
          onChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                phone: e.target.value,
                page: 1,
              },
            }))
          }
          value={state.query.phone}
        />
      </div>
      <div>
        <label>CATEGORY</label>
        <Select
          handleChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                category: e,
                page: 1,
              },
            }))
          }
          options={[
            { key: 1, label: 'Adult', value: 'Adult' },
            { key: 2, label: 'Teen', value: 'Teen' },
            { key: 3, value: 'Children', label: 'Child' },
          ]}
          placeholder={'Select Category'}
          name='category'
          value={state.query.category || 'Select Category'}
        />
      </div>
      <div>
        <label>GENDER</label>
        <Select
          value={state.query.gender || 'Select Gender'}
          options={[
            { key: 1, label: 'Male', value: 'Male' },
            { key: 2, label: 'Female', value: 'Female' },
          ]}
          placeholder={'Select Gender'}
          name='gender'
          handleChange={(e) =>
            setState((p) => ({
              ...p,
              query: {
                ...p.query,
                gender: e,
                page: 1,
              },
            }))
          }
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
