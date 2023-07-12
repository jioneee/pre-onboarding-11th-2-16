import styled from '@emotion/styled';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IssueList() {
  const navigate = useNavigate();
  const url = 'https://api.github.com/repos/facebook/react/issues';

  const [issueList, setIssueList] = useState<null | any[]>(null);

  const issuePage = (id: any) => {
    navigate(`/issue/${id}`);
  };

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
      const sortedIssues = openIssues.sort((a: any, b: any) => b.comments - a.comments);
      setIssueList(sortedIssues);
      console.log('res', sortedIssues);
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
            <Container key={index} onClick={() => issuePage(issue.number)}>
              <TextBox>
                {' '}
                <Text className='bold'>#{issue.number}</Text>
                <Text>제목:{issue.title}</Text>
              </TextBox>
              <TextBox>
                {' '}
                <Text>작성자:{issue.user.id}</Text>
                <Text>작성일:{new Date(issue.created_at).toLocaleDateString()}</Text>
              </TextBox>
              <TextBox>
                {' '}
                <Text>코멘트:{issue.comments}</Text>
              </TextBox>

              {(index + 1) % 4 === 0 && (
                <TextBox className='ad'>
                  <a href='https://www.wanted.co.kr/' target='_blank' rel='noopener noreferrer'>
                    <img src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100' alt='wanted' />
                  </a>
                </TextBox>
              )}
            </Container>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default IssueList;

const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 1px black;
  margin: 15px auto;
  padding: 10px;
  .bold {
    font-weight: 700;
  }
  .ad {
    border: solid 2px blue;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const Text = styled.span`
  box-sizing: border-box;
  margin: auto 5px;
`;
