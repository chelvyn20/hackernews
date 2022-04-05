// import { Component } from 'react';

/*
 * stateless class
 */
// class Button extends Component {
//   render() {
//     const { onClick, className, children } = this.props;
//     return (
//       <button type="button" className={className} onClick={onClick}>
//         {children}
//       </button>
//     );
//   }
// }

/*
 * stateless function
 */
const Button = (props) => {
  const { onClick, className = '', children } = props;
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

// const Button = ({ onClick, className, children }) => {
//   return (
//     <button type="button" className={className} onClick={onClick}>
//       {children}
//     </button>
//   );
// };

export { Button };
