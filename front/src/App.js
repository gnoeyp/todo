import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import AuthRoute from './AuthRoute';
import NotAuthRoute from './NotAuthRoute';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Enter from './pages/Enter';
import HeaderBar from './components/HeaderBar';
import UserContext from './UserContext';
import './App.less';

const { Header, Content } = Layout;


function App() {
  const [ user, setUser ] = useState(null);
  const authenticated = user !== null;


  useEffect(() => {
    async function auth() {
      let res = await fetch('http://localhost:5000/api/auth',
      {
          method: 'GET',
          credentials: 'include'
      });
      res = await res.json();
      if (res.status === 'success') {
        setUser(res.data.user);
      }
    }
    auth();
  }, []);


  const login = async (username, password) => {
    let res = await fetch('http://localhost:5000/api/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    res = await res.json();
    if (res.status === 'success') {
      setUser(res.data.user);
    }
    return res;
  }

  const logout = async () => {
    let res = await fetch('http://localhost:5000/api/logout',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include'
    });
    res = await res.json();
    if (res.status === 'success') {
      setUser(null);
      return res;
    } else if (res.data === 'Already logged out') {
      setUser(null);
      return res;
    }
  }

  const join = async (username, password) => {
    let res = await fetch('http://localhost:5000/api/join',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    res = await res.json();
    return res;
  }

  return (
    <UserContext.Provider value={{
      user: user,
      login: login,
      logout: logout,
      join: join
    }}>
      <Router>
        <Layout>
            <Header>
              <HeaderBar />
            </Header>
            <Content>
              <Switch>
                <AuthRoute authenticated={authenticated} render={() => <Main/>} path='/main' />
                <NotAuthRoute authenticated={authenticated} render={() => <Login />} path='/login' />
                <NotAuthRoute authenticated={authenticated} render={() => <Join />} path='/join' />
                <NotAuthRoute authenticated={authenticated} render={() => <Enter />} path='/' />
              </Switch>
          </Content>
        </Layout>
      </Router>
    </UserContext.Provider>

    
  );
}

export default App;
