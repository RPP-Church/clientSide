import { Steps } from 'antd';
import { useState } from 'react';
import propTypes from 'prop-types';
import Button from './Button';

const Steper = ({ items, sumbit, handleQueryToUrl, loading }) => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = items?.map((item) => ({
    ...item,
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    backgroundColor: 'transparent',
    marginTop: 16,
    padding: 20,
  };

  return (
    <>
      <Steps items={steps} current={current} />

      <div style={contentStyle}>{steps[current]?.child}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button
            background={'#090808'}
            border={'1px solid #f1efef'}
            color='#f1efef'
            radius={'5px'}
            width={'fit-content'}
            height={'2.6rem'}
            hoverBackground='#f1efef'
            hoverColor='#090808'
            size={'1rem'}
            onClick={() => {
              handleQueryToUrl();
              next();
            }}
            text={'Next'}
          />
        )}
        {current === steps.length - 1 && (
          <Button
            background={'#090808'}
            border={'1px solid #f1efef'}
            color='#f1efef'
            radius={'5px'}
            width={loading ? '3rem' : 'fit-content'}
            height={'2.6rem'}
            hoverBackground='#f1efef'
            hoverColor='#090808'
            size={'1rem'}
            onClick={() => sumbit()}
            text='Done'
            disable={loading}
            loading={loading}
          />
        )}
        {current > 0 && (
          <Button
            background={'transparent'}
            border={'1px solid #090808'}
            color='#090808'
            radius={'5px'}
            width={'fit-content'}
            height={'2.6rem'}
            hoverBackground='#f1efef'
            hoverColor='#090808'
            size={'1rem'}
            onClick={() => {
              handleQueryToUrl();
              prev();
            }}
            text={'Previous'}
            margin={'0 0 0 10px'}
          />
        )}
      </div>
    </>
  );
};

export default Steper;

Steper.propTypes = {
  items: propTypes.array,
  sumbit: propTypes.func,
  handleQueryToUrl: propTypes.func,
  loading: propTypes.bool,
};
