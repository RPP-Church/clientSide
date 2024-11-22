import { NavLink } from 'react-router-dom';

const SideLink = ({ href, onClick, className, child }) => {
  return (
    <NavLink to={href} onClick={() => onClick()}>
      <div className={className}>{child}</div>
    </NavLink>
  );
};

export default SideLink;
