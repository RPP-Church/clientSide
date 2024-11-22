
const HigerOrderComponent = (WrapComponent) => {
  const NewComponent = () => {
    return <WrapComponent />;
  };
  return NewComponent;
};

export default HigerOrderComponent;
