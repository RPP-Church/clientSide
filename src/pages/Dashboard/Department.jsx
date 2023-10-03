import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import useAxiosPrivate from '../../services/usePrivate';
import { Popconfirm, Table } from 'antd';
import styled from 'styled-components';
import Button from '../../components/Button';
import Modals from '../../components/Modal';
import Input from '../../components/Input';
import { ErrorHandler } from '../../components/ErrorHandler';

const Section = styled.section`
  background-color: #eee;

  .tableDiv {
    padding: 3rem 1rem;
  }

  .btn {
    display: flex;
    justify-content: end;
    padding-top: 2rem;
    padding-right: 1rem;
  }
`;

const Department = () => {
  const axios = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formdata, setFormdata] = useState({ name: '' });

  const [dataSource] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdat',
    },
  ]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await axios.get(`/department`);
      return data;
    },
    // retry: false,
  });

  const TableData = useMemo(() => {
    return data?.data?.length > 0
      ? data?.data?.map((item) => {
          return {
            key: item._id,
            name: item?.name,
            createdat: new Date(item.createdAt).toISOString()?.slice(0, -14),
          };
        })
      : [];
  }, [data?.data]);

  const { mutate, isLoading: loadAdd } = useMutation({
    mutationFn: async (form) => {
      return await axios.post('/department', form);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formdata.name,
    };

    if (!data.name) {
      alert('Please eneter department name');
      return;
    }
    mutate(data);
  };

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (record) => {
      console.log(record);
      return await axios.delete(`/department/${record?.key}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      const message = ErrorHandler(error);
      alert(message.data.msg);
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdat',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => mutateDelete(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Section>
      <Modals
        title='Add New Department'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        handleOK={handleSubmit}
        okText='Add New'
        loading={loadAdd}
      >
        <div>
          <Input
            placeholder={'Department Name'}
            handleChange={(e) =>
              setFormdata((p) => ({ ...p, name: e.target.value }))
            }
            name='name'
          />
        </div>
      </Modals>
      <div className='btn'>
        <Button
          text={'Add Department'}
          background={'transparent'}
          border={'1px solid #333'}
          radius={'6px'}
          size={'.9rem'}
          hoverBackground={'#090808'}
          hoverColor={'#fff'}
          onClick={() => setIsModalOpen(true)}
          disable={isLoading}
        />
      </div>
      <div className='tableDiv'>
        <Table
          size='small'
          loading={isLoading}
          columns={columns}
          dataSource={TableData}
          scroll={{ x: true, scrollToFirstRowOnChange: true }}
        />
      </div>
    </Section>
  );
};

export default Department;
