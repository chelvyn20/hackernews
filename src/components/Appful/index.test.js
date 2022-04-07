import { createRoot } from 'react-dom/client';
import { act, create } from 'react-test-renderer';
import { list } from '../../dummy/DummyData';
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
      hits: list,
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
