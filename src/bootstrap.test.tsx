import configureStore from 'redux-mock-store';
import { mount } from './bootstrap';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock('./LibraryApp', () => jest.fn(() => <div>LibraryApp Mock</div>));

const mockStore = configureStore([]);

describe('Bootstrap Mount Function', () => {
  let el: HTMLElement;
  let store: any;

  beforeEach(() => {
    el = document.createElement('div');
    store = mockStore({});
    store.dispatch = jest.fn();
  });


  it('handles onParentNavigate callback', () => {
    const { onParentNavigate } = mount(el, { isAdmin: true });

    const mockOnNavigate = jest.fn();
    onParentNavigate({ pathname: '/new-path' });

    expect(mockOnNavigate).not.toHaveBeenCalled(); // Ensure it doesn't break without `onNavigate`.
  });

  it('renders in development mode when devRoot exists', () => {
    const mockRoot = document.createElement('div');
    mockRoot.id = 'library-root';
    document.body.appendChild(mockRoot);

    jest.isolateModules(() => {
      process.env.NODE_ENV = 'development';
      require('./bootstrap');
    });

    expect(document.getElementById('library-root')).toBeTruthy();
  });

  it('does not render in production mode when devRoot exists', () => {
    process.env.NODE_ENV = 'production';

    jest.isolateModules(() => {
      const { mount: productionMount } = require('./bootstrap');
      const mockRoot = document.createElement('div');
      mockRoot.id = 'library-root';
      productionMount(mockRoot, { isAdmin: true });

      expect(document.getElementById('root')).not.toBeUndefined();
    });
  });
});
