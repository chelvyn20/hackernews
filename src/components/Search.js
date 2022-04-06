// import { Component } from 'react';

/*
 * stateless class
 */
// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         {children} <input type="text" value={value} onChange={onChange} />
//       </form>
//     );
//   }
// }

/*
 * stateless function
 */
const Search = (props) => {
  const { value, onChange, onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  );
};

// function Search({ value, onChange, children }) {
//   return (
//     <form>
//       {children} <input type="text" value={value} onChange={onChange}></input>
//     </form>
//   );
// }

export { Search };
