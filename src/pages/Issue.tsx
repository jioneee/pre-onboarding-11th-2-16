import styled from '@emotion/styled';

import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { useParams } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Loading } from '../components/Loading';

export function Issue() {
  const { id } = useParams<{ id: string }>();
  const { url } = useContext(ApiContext);
  const [issue, setIssue] = useState<any>(null);

  useEffect(() => {
    const getIssue = async () => {
      try {
        const headers = {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        };

        const response = await axios.get(`${url}/${id}`, { headers });
        setIssue(response.data);
        console.log('res', response);
      } catch (error) {
        console.log('error', error);
      }
    };

    getIssue();
  }, [id, url]);

  if (issue === null) {
    return <Loading />;
  }

  return (
    <div>
      <IssueContainer>
        <TextBox>
          <Text className='profile'>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
          </Text>
          <Text className='bold'>#{issue.number}</Text>
          <Text className='bold'>[{issue.title}]</Text>
        </TextBox>

        <TextBox>
          <Text>작성자: {issue.user.login}</Text>
          <Text>작성일: {new Date(issue.created_at).toLocaleDateString()}</Text>
        </TextBox>
        <TextBox>
          <Text>코멘트: {issue.comments}</Text>
        </TextBox>
      </IssueContainer>

      <IssueContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={issue.body}></ReactMarkdown>
      </IssueContainer>
    </div>
  );
}

const IssueContainer = styled.div`
  box-sizing: border-box;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-bottom: solid 1px black;
  margin: 15px auto;
  padding: 10px;
  .bold {
    font-weight: 500;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
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
