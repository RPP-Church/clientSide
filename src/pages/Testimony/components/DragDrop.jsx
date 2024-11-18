import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const DragAndDrop = ({ setState }) => {
  // const propsd =
  // {
  //     name: 'file',
  //     multiple: true,
  //     action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  //     onChange(info) {
  //       const { status } = info.file;
  //       console.log(info);
  //       // if (status !== 'uploading') {
  //       //   console.log(info.file, info.fileList);
  //       // }
  //       // if (status === 'done') {
  //       //   message.success(`${info.file.name} file uploaded successfully.`);
  //       // } else if (status === 'error') {
  //       //   message.error(`${info.file.name} file upload failed.`);
  //       // }
  //     },
  //     onDrop(e) {
  //       console.log('Dropped files', e.dataTransfer.files);
  //     },
  //   };

  const handleChange = (e) => {
    setState((p) => ({
      ...p,
      media: e.fileList,
    }));
  };

  return (
    <Dragger onChange={(e) => handleChange(e)} onDrop={(e) => handleChange(e)}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined color='#848484' />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Accepts mpg, avi, jpg, jpeg, png,
        gif, pdf.
      </p>
    </Dragger>
  );
};
export default DragAndDrop;
