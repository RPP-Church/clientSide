import { useParams } from 'react-router-dom';
import Head from '../../../components/Head';
import Container from '../../../style/container';
import { GetSingleMember } from '../../../services/getMembers';
import Splash from '../../../components/animation';
import styled from 'styled-components';
import { useState } from 'react';
import { FetchDepartments } from '../../../services/fetchDepartments';
import { UpdateMember } from '../../../services/updateMember';
import ProfileImage from './component/ProfileImage';
import Details from './component/Details';

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  @media screen and (min-width: 66rem) {
    grid-template-columns: 5fr 7fr;
  }

  .ant-select {
    width: 100% !important;
  }

  .profileImage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;
    background-color: #def9c4;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    @media screen and (max-width: 66rem) {
      padding: 10px 0;
    }

    .updateButtons {
      height: 2.3rem;

      div:first-child {
        display: flex;
        gap: 10px;
      }
    }
    .button {
      button {
        outline: 0;
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: clamp(0.8em, 20vh, 1em);
        cursor: pointer;
      }
    }
  }

  .profileContent {
    /* background-color: #DFD3C3; */
    background-color: #def9c4;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    .header {
      padding: 10px 0 0 10px;

      h2 {
        font-size: clamp(1.5em, 20vh, 2em);
      }
    }
    .inputWrapper {
      padding: 10px;
    }

    .inputContainer {
      display: flex;
      gap: 15px;
      margin: 10px 0;
      .child {
        flex: 1;
      }

      label {
        font-size: 0.7em;
        font-weight: bold;
      }
    }
  }

  .attendanceContainer {
    padding: 10px;

    .attendance {
      display: grid;
      gap: 20px;
      margin-top: 10px;
      height: 400px;
      overflow: auto;
      max-height: 500px;
      .ant-card {
        height: 150px !important;
      }
      @media screen and (min-width: 36rem) {
        grid-template-columns: auto auto;
        height: unset;
        overflow: auto;
        max-height: unset;
      }
    }
  }
`;
const SingleMember = () => {
  const { id } = useParams();
  const { data } = FetchDepartments();
  const [state, setState] = useState({
    update: true,
    controls: {
      category: '',
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      phone: '',
      email: '',
      spouseName: '',
      maritalStatus: '',
      membershipType: '',
      dateOfBirth: '',
      departments: [],
      joinedDate: '',
      title: '',
      attendance: [],
    },
  });
  const { isError, isFetching, refetch } = GetSingleMember({ id, setState });
  const { mutate, isLoading } = UpdateMember({
    refetch,
    close: () =>
      setState((p) => ({
        ...p,
        update: true,
      })),
  });

  const handleInput = (e, d, n) => {
    if (n === 'departments') {
      setState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: d,
        },
      }));
    } else {
      setState((p) => ({
        ...p,
        controls: {
          ...p.controls,
          [n]: e,
        },
      }));
    }
  };

  const handleUpdate = () => {
    const data = {
      firstName: state.controls.firstName,
      lastName: state.controls.lastName,
      phone: state.controls.phone || '',
      maritalStatus: state.controls.maritalStatus || '',
      address: state.controls.address || '',
      departments: state.controls.departments,
      membershipType: state.controls.membershipType,
      email: state.controls.email || '',
    };

    mutate({ data, id });
  };

  if (isFetching || isLoading) {
    return <Splash />;
  }

  if (isError) {
    return (
      <div>
        <h2>Error fetching member</h2>
      </div>
    );
  }
  return (
    <Container>
      <Head text={'RPP Church Portal'} />
      <Wrapper>
        <ProfileImage
          state={state}
          setState={setState}
          handleUpdate={handleUpdate}
        />
        <Details state={state} data={data} handleInput={handleInput} />
      </Wrapper>
    </Container>
  );
};

export default SingleMember;
