import { FaAsterisk } from 'react-icons/fa';
import Input from '../../../../components/Input';
import Modals from '../../../../components/Modal';
import TextArea from '../../../../components/TextArea';
import { DatePicker } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
`;

const NewStreamModal = ({ state, setState, handleSubmit, isLoading }) => {
  return (
    <Modals
      open={state.open}
      width={'30%'}
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
            handleChange={(e, d) => {
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
          <DatePicker
            showTime
            size='large'
            placeholder='Schedule Date'
            needConfirm
            onChange={(e) =>
              setState((p) => ({
                ...p,
                controls: {
                  ...p.controls,
                  scheduledStartTime: e.toISOString(),
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
      </Container>
    </Modals>
  );
};

export default NewStreamModal;
