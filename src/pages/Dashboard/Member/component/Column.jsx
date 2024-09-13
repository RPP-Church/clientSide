import Image from './Image';

const Columns = (Action) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'sn',
    },
    {
      title: '',
      dataIndex: 'image',
      render: (_, record) => {
        return <Image src={record?.image} />;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'FirstName',
      dataIndex: 'firstname',
    },
    {
      title: 'LastName',
      dataIndex: 'lastname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'DOB(MM/DD)',
      dataIndex: 'dob',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return <Action record={record} />;
      },
    },
  ];

  return columns;
};

export default Columns;
