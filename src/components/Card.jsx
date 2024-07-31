import styled from 'styled-components';
import propTypes from 'prop-types';

const Div = styled.div`
  background-color: #32c86e;
  padding: 1.5rem 2rem;
  height: clamp(8rem, 2.5vw, 12rem);
  max-height: 300px;
  border-radius: 8px;
  line-height: 2rem;
  overflow: auto;

  p {
    margin: 0;
    width: clamp(100%, 2.5vw, 70%);
    font-size: clamp(0.9rem, 2.5vw, 1.3rem);
    margin-top: 2rem;
    color: white;
  }
  h1 {
    font-size: clamp(1.4rem, 2.5vw, 2.2rem);
    color: white;
    font-weight: 600;
  }
`;
const Card = ({ name }) => {
  return (
    <Div>
      <h1>Hi, {name}!</h1>
      <p>
        Welcome to your RPP Church dashboard, perform different task by creating member, activtiy and generating
        excel report on present and absent {'member\'s'} from an activity. 
      </p>
    </Div>
  );
};

export default Card;

Card.propTypes = {
  name: propTypes.string,
};
