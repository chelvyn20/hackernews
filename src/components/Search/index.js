import { func, string, node } from 'prop-types';

const Search = (props) => {
  const { value, onChange, onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
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
