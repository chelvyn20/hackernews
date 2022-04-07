import { arrayOf, func, number, shape, string } from 'prop-types';
import { Button } from '../Button';
import './index.css';

const Table = (props) => {
  const { list, onDismiss } = props;
  const largeColumn = { width: '40%' };
  const mediumColumn = { width: '30%' };
  const smallColumn = { width: '10%' };

  return (
    <div className="table">
      {list.map((item) => (
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
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: arrayOf(
    shape({
      objectID: string.isRequired,
      author: string,
      url: string,
      num_comments: number,
      points: number,
    })
  ).isRequired,
  onDismiss: func.isRequired,
};

export { Table };
