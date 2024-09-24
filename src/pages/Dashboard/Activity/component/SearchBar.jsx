import Input from 'antd/es/input/Input';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import propTypes from 'prop-types';
import { SearchBAR } from '../../../../style/container';
import { DatePicker } from 'antd';

const SearchBar = styled.div`
  ${SearchBAR}

 

  label {
    display: block;
  }
`;

const StyleWrapperDatePicker = styled.div`
  .ant-picker-panel {
    &:last-child {
      width: 0;
      .ant-picker-header {
        position: absolute;
        right: 0;
        .ant-picker-header-prev-btn,
        .ant-picker-header-view {
          visibility: hidden;
        }
      }

      .ant-picker-body {
        display: none;
      }

      @media (min-width: 768px) {
        width: 280px !important;
        .ant-picker-header {
          position: relative;
          .ant-picker-header-prev-btn,
          .ant-picker-header-view {
            visibility: initial;
          }
        }

        .ant-picker-body {
          display: block;
        }
      }
    }
  }
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
        <RangeDatePicker
          style={{
            width: '100%',
            height: '45px',
            outline: 'none !important',
          }}
          onChange={(e, d) => {
            if (d?.length > 1) {
              setState((p) => ({
                ...p,
                query: {
                  ...p.query,
                  startDate: d[0],
                  endDate: d[1],
                },
              }));
            }
          }}
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

const RangeDatePicker = (props) => {
  const panelRender = (panelNode) => (
    <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
  );

  return (
    <DatePicker.RangePicker
      panelRender={panelRender}
      {...props}
      format={'MM/DD/YYYY'}
    />
  );
};
