import { Avatar } from 'antd';
import { LuUser2 } from 'react-icons/lu';

const Image = ({ src }) => {
  return <Avatar size={'default'} icon={<LuUser2 />} src={src} />;
};

export default Image;
