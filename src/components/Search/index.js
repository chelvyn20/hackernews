import { func, string, node } from 'prop-types';
import { useRef } from 'react';

const Search = (props) => {
  const { value, onChange, onSubmit, children } = props;
  const input = useRef();
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} ref={input} />
      <button type="submit">{children}</button>
    </form>
  );
};

Search.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  children: node.isRequired,
};

export { Search };
