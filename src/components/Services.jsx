import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { IoDocumentTextOutline } from 'react-icons/io5';
// import { IoPrint } from 'react-icons/io5';
// import { IoQrCodeSharp } from "react-icons/io5";
import { TbUsersGroup } from 'react-icons/tb';
import { FaChurch } from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md';
const Container = styled.div`
  margin-top: clamp(1.6rem, 2.5vw, 2.5rem);

  .serviced {
    margin-top: clamp(1.5rem, 2.5vw, 2rem);
    display: grid;
    grid-template-columns: auto auto;
    gap: 15px;
    a {
      text-decoration: none !important;
      text-align: center;

      p {
        margin-top: 1rem;
        color: black;
      }
    }
    @media screen and (min-width: 66rem) {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
  }
`;

const Card = styled.div`
  background-color: #32c86e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  width: 93%;
  height: clamp(8rem, 2.5vw, 14rem);

  @media screen and (min-width: 66rem) {
    width: clamp(7rem, 2.5vw, 14rem);
    height: clamp(7rem, 2.5vw, 14rem);
  }
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
            <FaChurch size={40} color='white' />
          </Card>
          <p>Activity</p>
        </Link>
        <Link to={'/dashboard/attendance'}>
          <Card>
            <IoDocumentTextOutline size={40} color='white' />
          </Card>
          <p>Capture Attendance</p>
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
        <Link to={'/dashboard/permission'}>
          <Card>
            <MdOutlineSecurity size={40} color='white' />
          </Card>
          <p>Permission</p>
        </Link>
        <Link to={'/dashboard/users'}>
          <Card>
            <TbUsersGroup size={40} color='white' />
          </Card>
          <p>Users</p>
        </Link>
        {/* <Link to={'/dashboard/report'}>
          <Card>
            <TbReport size={40} color='white' />
          </Card>
          <p>Generate Report</p>
        </Link> */}
      </div>
    </Container>
  );
};

export default Services;
