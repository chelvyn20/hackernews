import { func, node, string } from 'prop-types';

const Button = (props) => {
  const { onClick, className, children } = props;
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  onClick: func.isRequired,
  className: string,
  children: node.isRequired,
};

export { Button };
