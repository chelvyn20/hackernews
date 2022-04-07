import { createRoot } from 'react-dom/client';
import { create, act } from 'react-test-renderer';
import { Search } from './index';

describe('Search', () => {
  const props = {
    value: 'react',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
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

  it('should render, show input value as "react" and button textContent as Search', () => {
    act(() => {
      createRoot(container).render(<Search {...props}>Search</Search>);
    });
    const input = container.querySelector('input');
    expect(input.value).toBe('react');

    const button = container.querySelector('button');
    expect(button.textContent).toBe('Search');
  });

  test('snapshots', () => {
    const component = create(<Search {...props}>Search</Search>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
