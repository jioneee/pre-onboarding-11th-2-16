import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import IssueList from './pages/IssueList';
import { Issue } from './pages/Issue';
import { ErrorPage } from './pages/ErrorPage';
import { LoaderContextProvider } from './context/LoaderContext';

function App() {
  return (
    <LoaderContextProvider>
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
    </LoaderContextProvider>
  );
}

export default App;
