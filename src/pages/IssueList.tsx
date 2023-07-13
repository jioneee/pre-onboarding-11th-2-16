import styled from '@emotion/styled';

import axios from 'axios';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { LoaderContext } from '../context/LoaderContext';

function IssueList() {
  const navigate = useNavigate();
  const url = 'https://api.github.com/repos/facebook/react/issues';

  const { setLoading } = useContext(LoaderContext);
  const [issueList, setIssueList] = useState<any[]>([]);

  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);
  const observerTargetEl = useRef<HTMLDivElement>(null);

  const issuePage = (id: any) => {
    navigate(`/issue/${id}`);
  };

  const getIssueList = useCallback(async () => {
    try {
      const headers = {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      };

      const response = await axios.get(`${url}?_limit=10&_page=${page.current}`, { headers });
      console.log('res', response);
      const issues = response.data;
      const openIssues = issues.filter((issue: any) => issue.state === 'open');
      const sortedIssues = openIssues.sort((a: any, b: any) => b.comments - a.comments);
      // setIssueList(sortedIssues);
      setIssueList((prevIssueList: any[]) => [...prevIssueList, ...sortedIssues]);

      setHasNextPage(sortedIssues.length === 10);

      if (sortedIssues.length) {
        page.current += 1;
      }
      setLoading(false);

      console.log('res', sortedIssues);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  // useEffect(() => {
  //   getIssueList();
  // }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        getIssueList();
        console.log('Intersected!');
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [getIssueList, hasNextPage]);

  return (
    <div>
      {issueList !== null ? (
        <div>
          {issueList.map((issue, index) => (
            <Container key={issue.number}>
              <div key={index} onClick={() => issuePage(issue.number)}>
                <TextBox>
                  <Text className='bold'>#{issue.number}</Text>
                  <Text className='bold'>[{issue.title}]</Text>
                </TextBox>
                <TextBox>
                  <Text>작성자: {issue.user.login}</Text>
                  <Text>작성일: {new Date(issue.created_at).toLocaleDateString()}</Text>
                </TextBox>
                <TextBox className='comment'>
                  <Text>코멘트: {issue.comments}</Text>
                </TextBox>
              </div>

              <div>
                {' '}
                {(index + 1) % 4 === 0 && (
                  <TextBox className='ad'>
                    <a href='https://www.wanted.co.kr/' target='_blank' rel='noopener noreferrer'>
                      <img className='image' src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100' alt='wanted' />
                    </a>
                  </TextBox>
                )}
              </div>
            </Container>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div ref={observerTargetEl} />
    </div>
  );
}

export default IssueList;

const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-bottom: solid 1px black;
  margin: 15px auto;
  padding: 10px;
  cursor: pointer;
  .bold {
    font-weight: 500;
  }
  .ad {
    border: solid 2px blue;
  }
  .image {
    min-width: 200px;
  }
  .comment {
    text-align: right;
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
