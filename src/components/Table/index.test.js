import { createRoot } from 'react-dom/client';
import { create, act } from 'react-test-renderer';
import { Table } from './index';

describe('Table Component', () => {
  const props = {
    list: [
      {
        title: 'AAA',
        author: 'Abc',
        num_comments: 1,
        points: 2,
        objectID: 'abc0',
      },
      {
        title: 'BBB',
        author: 'Bcd',
        num_comments: 2,
        points: 3,
        objectID: 'abc1',
      },
    ],
    onDismiss: jest.fn(),
  };

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render, show two items in list and  ', () => {
    act(() => {
      createRoot(container).render(<Table {...props} />);
    });
    const tableRow = container.getElementsByClassName('table-row');
    expect(tableRow.length).toBe(2);

    const button = container.getElementsByClassName('button-inline')[0];
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(props.onDismiss).toHaveBeenCalledTimes(1);
  });

  test('snapshots', () => {
    const component = create(<Table {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
