import Input from 'antd/es/input/Input';
import styled from 'styled-components';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';
import { SearchBAR } from '../../../../style/container';
import { useLocation } from 'react-router-dom';

const SearchBar = styled.div`
  ${SearchBAR}
`;
const SearchBars = ({
  refetch,
  setMemberParams,
  handleSearchParams,
  memberParams,
}) => {
  const { pathname } = useLocation();
  const handleReset = () => {
    setMemberParams((p) => ({
      ...p,
      query: {
        size: 10,
        page: 1,
        name: '',
        lastName: '',
        phone: '',
        category: '',
        gender: '',
        membershipType: '',
      },
    }));
  };

  return (
    <SearchBar>
      <div>
        <label> NAME</label>
        <Input.Search
          type='text'
          name='firstName'
          placeholder='Search by any name'
          size='large'
          onChange={(e) => {
            setMemberParams((p) => ({
              ...p,
              query: {
                ...p.query,
                name: e.target.value,
                page: 1,
              },
            }));
            handleSearchParams('name', e.target.value);
          }}
          value={memberParams?.query?.name}
        />
      </div>

      <div>
        <label>PHONE</label>
        <Input.Search
          type='text'
          name='phone'
          placeholder='Search by Phone'
          size='large'
          onChange={(e) => {
            setMemberParams((p) => ({
              ...p,
              query: {
                ...p.query,
                phone: e.target.value,
                page: 1,
              },
            }));
            handleSearchParams('phone', e.target.value);
          }}
          value={memberParams?.query?.phone}
        />
      </div>
      {!pathname?.includes('attendance') && (
        <div>
          <label>CATEGORY</label>
          <Select
            handleChange={(e) => {
              setMemberParams((p) => ({
                ...p,
                query: {
                  ...p.query,
                  category: e,
                  page: 1,
                },
              }));
              handleSearchParams('category', e.target.value);
            }}
            value={memberParams?.query?.category || 'Select Category'}
            options={[
              { key: 1, label: 'Adult', value: 'Adult' },
              { key: 2, label: 'Teen', value: 'Teen' },
              { key: 3, value: 'Children', label: 'Child' },
            ]}
            placeholder={'Select Category'}
            name='category'
          />
        </div>
      )}

      {!pathname?.includes('attendance') && (
        <div>
          <label>Type</label>
          <Select
            handleChange={(e) => {
              setMemberParams((p) => ({
                ...p,
                query: {
                  ...p.query,
                  membershipType: e,
                  page: 1,
                },
              }));
              handleSearchParams('membershipType', e.target.value);
            }}
            value={memberParams?.query?.membershipType || 'Select Type'}
            options={[
              { key: 1, label: 'New Members', value: 'New Member' },
              { key: 2, label: 'Existing Members', value: 'Existing Member' },
              { key: 3, value: 'Visitor', label: 'Visitor' },
            ]}
            placeholder={'Select Type'}
            name='membershipType'
          />
        </div>
      )}
      {!pathname?.includes('attendance') && (
        <div>
          <label>GENDER</label>
          <Select
            options={[
              { key: 1, label: 'Male', value: 'Male' },
              { key: 2, label: 'Female', value: 'Female' },
            ]}
            placeholder={'Select Gender'}
            name='gender'
            handleChange={(e) => {
              setMemberParams((p) => ({
                ...p,
                query: {
                  ...p.query,
                  gender: e,
                  page: 1,
                },
              }));
              handleSearchParams('gender', e.target.value);
            }}
            value={memberParams?.query?.gender || 'Select Gender'}
          />
        </div>
      )}

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
  memberParams: propTypes.object,
  setMemberParams: propTypes.func,
  handleSearchParams: propTypes.func,
};
