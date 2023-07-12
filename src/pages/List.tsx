import axios from 'axios';
import { useState, useEffect } from 'react';

function List() {
  const url = 'https://api.github.com/repos/facebook/react/issues';

  const [issueList, setIssueList] = useState<null | any[]>(null);

  const getIssueList = async () => {
    try {
      const headers = {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      };

      const response = await axios.get(`${url}`, { headers });
      const issues = response.data;
      const openIssues = issues.filter((issue: any) => issue.state === 'open');
      setIssueList(openIssues);
      console.log('res', openIssues);
    } catch (error) {}
  };
  useEffect(() => {
    getIssueList();
  }, []);
  return (
    <div>
      {issueList !== null ? (
        <div>
          {issueList.map((issue, index) => (
            <tr key={index}>
              <span>번호:#{issue.number}</span>
              <span>제목:{issue.title}</span>
              <span>작성자:{issue.user.id}</span>
              <span>작성일:{new Date(issue.created_at).toLocaleDateString()}</span>
              <span>코멘트:{issue.comments}</span>
              {(index + 1) % 4 === 0 && (
                <div>
                  <a href='https://www.wanted.co.kr/' target='_blank' rel='noopener noreferrer'>
                    <img src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100' alt='광고 이미지' />
                  </a>
                </div>
              )}
            </tr>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default List;
