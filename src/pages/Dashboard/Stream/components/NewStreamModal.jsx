import { FaAsterisk } from 'react-icons/fa';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import TextArea from '../../../../components/TextArea';
import { Button, DatePicker, Upload } from 'antd';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import Select from '../../../../components/Select';
import propTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
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

const RangeDatePicker = (props) => {
  const panelRender = (panelNode) => (
    <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
  );

  return (
    <DatePicker
      panelRender={panelRender}
      {...props}
      //format={'MM/DD/YYYY'}
      showTime
    />
  );
};

const NewStreamModal = ({ state, setState, handleSubmit, isLoading }) => {
  console.log(state);

  return (
    <Modals
      open={state.open}
      width={'40%'}
      onCancel={() => setState((p) => ({ ...p, open: false }))}
      handleOK={handleSubmit}
      loading={isLoading}
      okText={'Create'}
    >
      <Container>
        <div className='child'>
          <label>
            Title <FaAsterisk size={8} color='red' />
          </label>
          <Input
            name='title'
            placeholder={'Stream Title'}
            size={'large'}
            value={state.controls.title}
            handleChange={(e) => {
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  title: e.target.value,
                },
              }));
            }}
          />
        </div>
        <div>
          <label>
            Scheduled DateTime <FaAsterisk size={8} color='red' />
          </label>
          <RangeDatePicker
            style={{
              width: '100%',
              height: '45px',
              outline: 'none !important',
            }}
            showTime
            size='large'
            placeholder='Schedule Date'
            needConfirm
            onChange={(e) =>
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  scheduledStartTime: e?.toISOString(),
                },
              }))
            }
          />
        </div>
        <div>
          <label>
            Description <FaAsterisk size={8} color='red' />
          </label>
          <TextArea
            size={'large'}
            height={'500px'}
            value={state.controls.description}
            handleChange={(e) =>
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  description: e.target.value,
                },
              }))
            }
          />
        </div>
        <div>
          <label>
            Visibility <FaAsterisk size={8} color='red' />
          </label>
          <Select
            options={[
              { key: '1', label: 'Public', value: 'Public' },
              { key: '2', label: 'Private', value: 'Private' },
              { key: '3', label: 'Unlisted', value: 'Unlisted' },
            ]}
            placeholder={'Select Visibility'}
            width={'100%'}
            handleChange={(e) =>
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  visibility: e,
                },
              }))
            }
            value={state.controls.visibility}
          />
        </div>
        <div>
          <span>Add Thumbnail</span>
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept='image/*'
            maxCount={1}
            onChange={(e) => {
              const file = e.fileList[0].originFileObj;
              const reader = new FileReader();
              reader.onload = () => {
                setState((p) => ({
                  ...p,
                  controls: {
                    ...p.controls,
                    thumbnail: file,
                  },
                }));
              };
              reader.readAsDataURL(file);
            }}
            onRemove={() => {
              setState((p) => ({
                ...p,
                thumbnail: null,
              }));
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </Container>
    </Modals>
  );
};

export default NewStreamModal;

NewStreamModal.propTypes = {
  isLoading: propTypes.bool,
  handleSubmit: propTypes.func,
  state: propTypes.any,
  setState: propTypes.func,
};
