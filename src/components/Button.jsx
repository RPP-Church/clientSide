import styled from 'styled-components';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

const Btn = styled.button`
  background-color: ${({ background }) =>
    background ? background : '#090808'};
  border: ${({ border }) => (border ? border : 'none')};
  color: ${({ color }) => (color ? color : '#090808')};
  padding: ${({ padding }) => (padding ? padding : '8px')};
  border-radius: ${({ radius }) => radius};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  cursor: pointer;
`;

const Button = ({
  color,
  size,
  width,
  height,
  background,
  text,
  border,
  radius,
  padding,
  hoverBackground,
  hoverColor,
  onClick,
  weight,
  disable,
}) => {
  return (
    <Btn
      as={motion.button}
      initial={{ background: background }}
      whileHover={{
        scale: 1.1,
        background: hoverBackground,
        color: hoverColor,
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.5, type: 'spring' }}
      color={color}
      size={size}
      height={height}
      background={background}
      width={width}
      border={border}
      radius={radius}
      padding={padding}
      onClick={onClick}
      weight={weight}
      disabled={disable}
    >
      {text}
    </Btn>
  );
};

export default Button;

Button.propTypes = {
  Button: propTypes.any,
  color: propTypes.string,
  size: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
  background: propTypes.string,
  text: propTypes.string,
  border: propTypes.string,
  radius: propTypes.string,
  padding: propTypes.string,
  hoverBackground: propTypes.string,
  hoverColor: propTypes.string,
  onClick: propTypes.func,
  weight: propTypes.string,
  disable: propTypes.bool,
};
