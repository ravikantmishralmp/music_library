import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import LibraryApp from './LibraryApp';

interface MountOptions {
  onNavigate?: (location: { pathname: string }) => void;
  defaultHistory?: 'browser' | 'memory';
  initialPath?: string;
  isSignedIn?:boolean;
  isAdmin:boolean;
}

const mount = (
  el: HTMLElement,
  { onNavigate, 
    isSignedIn,
    isAdmin,
    defaultHistory = 'memory', initialPath = '/' }: MountOptions
) => {
  const RouterComponent = defaultHistory === 'browser' ? (
    <BrowserRouter>
      <LibraryApp isAdmin={isAdmin} />
    </BrowserRouter>
  ) : (
    <MemoryRouter initialEntries={[initialPath]}>
      <LibraryApp isAdmin={isAdmin} />
    </MemoryRouter>
  );
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <div
          style={{
            width: '100%',
            height: '100%', // Use 100% of the parent container's height
            overflow: 'hidden', // Prevent layout overflow
          }}
        >
        {RouterComponent}
        </div>
      </Provider>
    </React.StrictMode>,
  );

  return {
    onParentNavigate({ pathname: nextPathname }: { pathname: string }) {
      if (onNavigate && nextPathname) {
        onNavigate({ pathname: nextPathname });
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('library-root');
  if (devRoot) {
    mount(devRoot, {defaultHistory: 'browser', isAdmin: true});
  }
}

export { mount };
