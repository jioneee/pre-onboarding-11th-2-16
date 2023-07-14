import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import IssueList from './pages/IssueList';
import { Issue } from './pages/Issue';
import { ErrorPage } from './pages/ErrorPage';
import { ApiContextProvider } from './context/ApiContext';

function App(): React.ReactElement {
  return (
    <ApiContextProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<IssueList />} />
            <Route path='/issue/:id' element={<Issue />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApiContextProvider>
  );
}

export default App;
