import { FetchAllTestimonies } from '../../../services/fetchTestimonies';
import { FetchErrorAnimation, Splash } from '../../../components/animation';
import TableData from './components/TableData';
import TableComponent from '../Member/component/TableComponent';
import Container from '../../../style/container';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { useState } from 'react';
import { Notification } from '../../../components/Notification';
import Button from '../../../components/Button';
import { DownloadTestimony } from '../../../services/DownloadTestimonies';

const Index = () => {
  const { isError, isFetching, data, refetch, error } = FetchAllTestimonies();
  const [state, setState] = useState({
    messages: [],
  });

  const { mutate, isLoading, error: err, isError: isErr } = DownloadTestimony();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Testimony',
      dataIndex: 'testimony',
    },
    {
      title: 'Media',
      dataIndex: 'media',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const checkKey = state.messages?.find((c) => c.key === record.key);
        return (
          <Checkbox
            onClick={(e) => {
              if (!e.target.checked) {
                const newState = [...state.messages]?.filter(
                  (c) => c.key !== record.key
                );
                setState((p) => ({
                  ...p,
                  messages: newState,
                }));
                return;
              } else if (checkKey) {
                Notification({
                  type: 'warning',
                  message: 'You already selected this message',
                });

                return;
              } else {
                setState((p) => ({
                  ...p,
                  messages: [...p.messages, record],
                }));
              }
            }}
            checked={checkKey?.key ? true : false}
          />
        );
      },
    },
  ];
  const Data = TableData({ data });

  if (isFetching || isLoading) {
    return <Splash />;
  }

  if (isError || isErr) {
    return (
      <FetchErrorAnimation
        refetch={isErr ? () => window.location.reload() : refetch}
        error={error || err}
      />
    );
  }

  return (
    <Container styles={{ height: '100%' }}>
      {/* <Head style={{ margin: '10px 0' }}>
        <h1>Testimony</h1>
      </Head> */}
      <TestimonyContainer>
        <div style={{ height: '3rem' }}>
          {state.messages.length > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <Button
                text='Download '
                color={'white'}
                radius={'4px'}
                onClick={() => {
                  if (!state.messages.length > 0) {
                    Notification({
                      type: 'warning',
                      message: 'Cannot download empty testimony',
                    });

                    return;
                  }

                  const data = {
                    testimony: state.messages,
                  };
                  mutate(data);
                }}
                disable={isLoading}
              />
            </div>
          )}
        </div>
        <TableComponent
          isFetching={isFetching}
          Data={Data}
          columns={columns}
          // handlePagination={handlePagination}
          current={data?.current + 1}
          total={data?.totalElement}
        />
        {/* {data?.data?.length > 0
          ? data?.data?.map((item) => {
              return (
                <Card key={item._id}>
                  <div>
                    <h2>{item.name}</h2>
                    <div>
                      <p>{item.testimony}</p>
                    </div>
                    <button>View more</button>
                  </div>
                </Card>
              );
            })
          : 'No'} */}
      </TestimonyContainer>
    </Container>
  );
};

export default Index;

const TestimonyContainer = styled.div`
  /* display: grid;
  height: 100%;

  gap: 1em;

  @media screen and (min-width: 801px) {
    grid-template-columns: repeat(12, 1fr) !important;
  } */
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 3px 3px #00000040;
  width: 261.29px;
  max-height: 114px;

  h2,
  p {
    font-family: var(--Inter-family);
  }

  h2 {
    font-weight: 500;
    font-size: clamp(1em, 2vw, 1.5em);
  }

  p {
    font-size: 15px;
    color: #959595;

    height: 18px;
    width: 140px;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 5px 0 5px;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;
  }
`;
const Head = styled.div`
  background-color: #28166f80;
`;
