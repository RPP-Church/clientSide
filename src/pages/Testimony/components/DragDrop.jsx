import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { covertBase } from '../../../hook/covertImage';
import { Notification } from '../../../components/Notification';
const { Dragger } = Upload;

const DragAndDrop = ({ setState, state }) => {
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

  const handleChange = async (e) => {
    if (e?.fileList?.length > 1) {
      Notification({
        type: 'warning',
        message: 'Only one image allowed for now',
        placement: 'bottomLeft',
      });

      return;
    }
    if (e?.fileList?.length > 0) {
      for (var i = 0; i < e.fileList.length; i++) {
        if (e.fileList[i].type?.includes('image')) {
          if (e.fileList[i].size > 205000) {
            return Notification({
              type: 'warning',
              message: 'Image must be not be greater than 200kb',
            });
          }
          const image = await covertBase(e.fileList[i]?.originFileObj);
          setState((p) => ({
            ...p,
            media: [
              ...p.media,
              {
                ...e.fileList[i],
                base64: image,
                id: p.media.length + 1,
                uid: p.media.length + 1 + Date.now(),
              },
            ],
          }));
        }
        if (e.fileList[i].type?.includes('pdf')) {
          const file = URL.createObjectURL(e.fileList[i]?.originFileObj);
          const image = await covertBase(e.fileList[i]?.originFileObj);
          // setState((p) => ({
          //   ...p,
          //   media: [
          //     ...p.media,
          //     {
          //       ...e.fileList[i],
          //       file,
          //       base64: image,
          //       status: 'error',
          //     },
          //   ],
          // }));
          Notification({
            type: 'error',
            message: 'Only pictures for now',
            placement: 'bottomLeft',
          });
        }
        if (e.fileList[i].type?.includes('audio')) {
          Notification({
            type: 'error',
            message: 'Only pictures for now',
            placement: 'bottomLeft',
          });
          // const file = e.fileList[i];

          // if (file) {
          //   const reader = new FileReader();
          //   reader.onload = () => {
          //     const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
          //     setState((p) => ({
          //       ...p,
          //       media: [
          //         ...p.media,
          //         {
          //           ...file,
          //           base64: base64String,
          //           status: 'error',
          //         },
          //       ],
          //     }));
          //   };
          //   reader.readAsDataURL(file.originFileObj);
          // }
        }
      }
    }
  };

  return (
    <Dragger
      onChange={(e) => handleChange(e)}
      onDrop={(e) => handleChange(e)}
      fileList={state}
      beforeUpload={() => {
        return false;
      }}
      onRemove={(e) => {
        const newList = state?.filter((item) => item.id !== e.id);
        setState((p) => ({
          ...p,
          media: newList,
        }));
      }}
      // maxCount={1}
      // key={1 + 1}
      // multiple={false}
    >
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
