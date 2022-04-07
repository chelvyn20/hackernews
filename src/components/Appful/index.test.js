import { createRoot } from 'react-dom/client';
import { act, create } from 'react-test-renderer';
import Appful from './index';

describe('Appful', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render hits list', async () => {
    const fakeResult = {
      hits: [
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
      page: 1,
    };

    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(fakeResult) })
      );

    await act(async () => {
      createRoot(container).render(<Appful />);
    });

    const tableRow = container.getElementsByClassName('table-row');
    expect(tableRow.length).toBe(2);

    global.fetch.mockRestore();
  });

  test('snapshots', () => {
    const component = create(<Appful />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
