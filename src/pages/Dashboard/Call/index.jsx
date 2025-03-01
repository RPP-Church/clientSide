import styled from 'styled-components';
import Head from '../../../components/Head';
import Container from '../../../style/container';
import {
  GetAdminCallLog,
  RedialUserCall,
  UpdateCallLog,
  UpdateUserCall,
} from '../../../services/getAdminCallLog';
import TableData from './Table';
import TableComponent from '../Member/component/TableComponent';
import { CallIcon, StatusIcon } from '../../../components/SideBar/Icons';
import { getToken } from '../../../services/getToken';
import { Popconfirm, message, Popover, Tooltip } from 'antd';
import { useState } from 'react';
import Button from '../../../components/Button';
import { FetchErrorAnimation } from '../../../components/animation';
import { BiNotepad } from 'react-icons/bi';
import NoteModal from '../Note';

const Wrapper = styled.div`
  .new-post {
    display: flex;
    justify-content: end;
    margin: 2rem 0;
  }
`;

const Index = () => {
  const { data, isError, error, isFetching, refetch } = GetAdminCallLog();
  const { mutate: updateCall, isLoading: loading } =
    UpdateUserCall(onSuccessCall);
  const { mutate, isLoading } = UpdateCallLog(onSuccess);
  const { mutate: redialUpdate, isLoading: redialing } =
    RedialUserCall(onSuccessCall);

  const [state, setState] = useState({
    open: false,
    id: null,
    openUpdate: false,
  });

  const [show, setShow] = useState(false);

  const user = getToken();
  const DATA = TableData(data);

  function onSuccess() {
    message.success('Call log updated successfully.');
    setState({
      open: false,
      id: null,
      openUpdate: false,
    });
  }

  function onSuccessCall(data) {
    if (data?.data?.callLog?.phone) {
      window.open(`tel:+234${data.data.callLog.phone}`, '_system');
    } else {
      message.error('Phone number is missing.');
    }
  }

  const handleConfirmCall = (record, type) => {
    setState((p) => ({
      ...p,
      open: true,
      id: record.key,
      phone: record.phone,
    }));

    if (type === 'cancel') {
      redialUpdate(record.key);
      return;
    }
    updateCall(record.key);
  };

  const handleCompletedCall = (status, record) => {
    const form = {
      status,
    };

    if (isLoading) return;

    mutate({ form, Id: record.key });
  };

  const Content = ({ record }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '50%',
      }}
    >
      <Tooltip
        title='Call was successful, you were able to establish connection'
        placement='top'
      >
        <Button
          text={'Success'}
          background={'green'}
          size={'12px'}
          weight={500}
          radius={'3px'}
          padding={'4px'}
          color={'white'}
          onClick={() => handleCompletedCall('Completed', record)}
          disable={isLoading}
          loading={isLoading}
        />
      </Tooltip>
      <Tooltip title='Call failed, member phone was off or not picking'>
        <Button
          onClick={() => handleCompletedCall('Failed', record)}
          text={'Failed'}
          background={'red'}
          size={'12px'}
          weight={500}
          radius={'3px'}
          padding={'4px'}
          color={'white'}
          disable={isLoading}
          loading={isLoading}
        />
      </Tooltip>
    </div>
  );

  const CallConfirmationContent = ({ record }) => (
    <div>
      <span style={{ fontWeight: 600, color: 'red', fontSize: '12px' }}>
        Do you want to call this member?
      </span>
      <div style={{ fontSize: '11px' }}>
        Please to close, click{' '}
        <span
          style={{
            fontWeight: 400,
            backgroundColor: 'red',
            color: 'white',
            padding: '2px',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
          onClick={() =>
            setState((p) => ({
              ...p,
              open: false,
              id: '',
            }))
          }
        >
          Cancel
        </span>
      </div>
    </div>
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: 'Member',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'AbsentDates',
      dataIndex: 'absentDates',
    },
    {
      title: 'NumberOfAbsent',
      dataIndex: 'absentCount',
    },
    {
      title: 'Membership',
      dataIndex: 'membershipType',
    },
    {
      title: 'Assigned Date',
      dataIndex: 'assignedDate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '15px' }}>
          <Popconfirm
            title={`Call ${record.name}`}
            description={<CallConfirmationContent record={record} />}
            onConfirm={() => handleConfirmCall(record)}
            okText='CALL'
            cancelText='Redial'
            okButtonProps={{ loading: loading }}
            open={state.open && state.id === record.key}
            onCancel={() => handleConfirmCall(record, 'cancel')}
            cancelButtonProps={{ loading: redialing }}
          >
            <span
              onClick={() =>
                setState((p) => ({
                  ...p,
                  open: true,
                  id: record.key,
                }))
              }
            >
              <CallIcon
                styles={{
                  color: 'black',
                  fontSize: '.3em',
                  cursor: 'pointer',
                }}
              />
            </span>
          </Popconfirm>
          <Popover
            content={() => <Content record={record} />}
            title='Update Call Status'
            trigger='click'
            open={state.openUpdate && state.id === record.key}
            onOpenChange={(e) =>
              setState((p) => ({
                ...p,
                id: null,
                openUpdate: e,
              }))
            }
          >
            <span
              onClick={() =>
                setState((p) => ({
                  ...p,
                  openUpdate: true,
                  id: record.key,
                }))
              }
              style={{ cursor: 'pointer' }}
            >
              <StatusIcon />
            </span>
          </Popover>
          <div>
            <span
              onClick={() => {
                setState((p) => ({
                  ...p,
                  id: record.key,
                }));
                setShow(true);
              }}
            >
              <BiNotepad size={17} />
            </span>
          </div>
        </div>
      ),
    },
  ];

  if (isError) {
    return <FetchErrorAnimation refetch={refetch} error={error} />;
  }
  return (
    <Container>
      <NoteModal show={show} setShow={setShow} memberId={state.id} />
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <div style={{ margin: '10px 0' }}>
          <h3>Absent Members assigned to {user?.name}</h3>
        </div>
        <TableComponent
          isFetching={isFetching}
          Data={DATA}
          columns={columns}
          current={data?.current + 1}
          total={data?.totalElement}
        />
      </Wrapper>
    </Container>
  );
};

export default Index;
