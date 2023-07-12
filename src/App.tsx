import './App.css';
import { Header } from './components/Header';
import IssueList from './pages/IssueList';
import { Issue } from './pages/Issue';
import { ErrorPage } from './pages/ErrorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
