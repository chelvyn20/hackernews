import { createRoot } from 'react-dom/client';
import { create, act } from 'react-test-renderer';
import { Button } from './index';

describe('Button', () => {
  const props = {
    onClick: jest.fn(),
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

  it('should render and show button textContent as "More"', () => {
    act(() => {
      createRoot(container).render(<Button {...props}>More</Button>);
    });
    const button = container.getElementsByTagName('button')[0];
    expect(button.textContent).toBe('More');
  });

  test('snapshots', () => {
    const component = create(<Button {...props}>More</Button>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
