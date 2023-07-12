import './App.css';
import List from './pages/List';

function App() {
  // const BASE_URL = 'https://api.github.com/repos';
  // const getissue = async () => {
  //   const data = await axios.get(`${BASE_URL}facebook/react/issues`, {
  //     headers: {
  //       Accept: 'application/vnd.github+json',
  //       Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  //       'X-GitHub-Api-Version': '2022-11-28',
  //     },
  //   });
  //   console.log(data);
  // };
  // getissue();

  return (
    <div>
      <List />
    </div>
  );
}

export default App;
