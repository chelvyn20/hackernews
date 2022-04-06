const Button = (props) => {
  const { onClick, className = '', children } = props;
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
