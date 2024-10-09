import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading
  } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <header>
        <h1>Task Management App</h1>
        {isAuthenticated ? (
          <>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </button>
            <p>Welcome, {user.name}!</p>
            <TaskList />
          </>
        ) : (
          <>
            <button onClick={loginWithRedirect}>Log In</button>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
