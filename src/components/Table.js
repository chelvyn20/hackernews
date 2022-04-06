// import { Component } from 'react';
import { Button } from './Button';

// higher order function
const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

/*
 * stateless class
 */
// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {list.filter(isSearched(pattern)).map((item) => (
//           <div key={item.objectID}>
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span> {item.author}</span>
//             <span> {item.num_comments}</span>
//             <span> {item.points} </span>
//             <span>
//               <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

/*
 * stateless function
 */
const Table = (props) => {
  const { list, pattern, onDismiss } = props;
  const largeColumn = { width: '40%' };
  const mediumColumn = { width: '30%' };
  const smallColumn = { width: '10%' };

  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map((item) => (
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={mediumColumn}> {item.author}</span>
          <span style={smallColumn}> {item.num_comments}</span>
          <span style={smallColumn}> {item.points} </span>
          <span style={smallColumn}>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}>
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

// const Table = ({ list, pattern, onDismiss }) => {
//   const { list, pattern, onDismiss } = props;
//   return (
//     <div>
//       {list.filter(isSearched(pattern)).map((item) => (
//         <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title}</a>
//           </span>
//           <span> {item.author}</span>
//           <span> {item.num_comments}</span>
//           <span> {item.points} </span>
//           <span>
//             <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// function Table(props) {
//   const { list, pattern, onDismiss } = props;
//   return (
//     <div>
//       {list.filter(isSearched(pattern)).map((item) => (
//         <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title}</a>
//           </span>
//           <span> {item.author}</span>
//           <span> {item.num_comments}</span>
//           <span> {item.points} </span>
//           <span>
//             <button onClick={() => onDismiss(item.objectID)} type="button">
//               Dismiss
//             </button>
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

export { Table };
