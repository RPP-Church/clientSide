import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { IoDocumentTextOutline } from 'react-icons/io5';
// import { IoPrint } from 'react-icons/io5';
// import { IoQrCodeSharp } from "react-icons/io5";
import { TbReport } from 'react-icons/tb';
const Container = styled.div`
  margin-top: clamp(1.6rem, 2.5vw, 2.5rem);

  .serviced {
    margin-top: clamp(1.5rem, 2.5vw, 2rem);
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    a {
      text-decoration: none !important;
      text-align: center;

      p {
        margin-top: 1rem;
        color: black;
      }
    }
  }
`;

const Card = styled.div`
  width: clamp(7rem, 2.5vw, 14rem);
  background-color: #32c86e;
  height: clamp(7rem, 2.5vw, 14rem);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`;
const Services = () => {
  return (
    <Container>
      <div>
        <h3>Services</h3>
      </div>
      <div className='serviced'>
        <Link to={'/dashboard/member'}>
          <Card>
            <FaPlus size={40} color='white' />
          </Card>
          <p>Member</p>
        </Link>
        <Link to={'/dashboard/department'}>
          <Card>
            <IoPaperPlaneOutline size={40} color='white' />
          </Card>
          <p>Department</p>
        </Link>
        <Link to={'/dashboard/activity'}>
          <Card>
            <HiOutlineDevicePhoneMobile size={40} color='white' />
          </Card>
          <p>Activity</p>
        </Link>
        <Link to={'/dashboard/attendance'}>
          <Card>
            <IoDocumentTextOutline size={40} color='white' />
          </Card>
          <p>Attendance</p>
        </Link>
        {/* <Link to={'/print'}>
          <Card>
            <IoPrint size={40} color='white' />
          </Card>
          <p>Download Stickers</p>
        </Link>
        <Link to={'/generate/code'}>
          <Card>
            <IoQrCodeSharp size={40} color='white' />
          </Card>
          <p>Generate Code</p>
        </Link> */}
        <Link to={'/dashboard/report'}>
          <Card>
            <TbReport size={40} color='white' />
          </Card>
          <p>Generate Report</p>
        </Link>
      </div>
    </Container>
  );
};

export default Services;
