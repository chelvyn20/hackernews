import { createRoot } from 'react-dom/client';
import { act, create } from 'react-test-renderer';
import App from './index';

describe('App', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render', async () => {
    await act(async () => {
      createRoot(container).render(<App />);
    });
  });

  test('snapshots', () => {
    const component = create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
