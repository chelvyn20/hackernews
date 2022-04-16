import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

const Loading = () => {
  return (
    <div>
      <FontAwesomeIcon className="spinner" icon={faSpinner} />
      <span id="text-loading"> Loading ...</span>
    </div>
  );
};

export { Loading };
