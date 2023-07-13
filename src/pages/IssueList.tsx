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
  // const [target, setTarget] = useState(null)
  const [page, setPage] = useState<Number>(1);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const issuePage = (id: any) => {
    navigate(`/issue/${id}`);
  };
  const callback = useCallback(
    (entry: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry[0].isIntersecting) {
        setPage((prev: any) => (prev = prev + 1));
        observer.unobserve(entry[0].target);
      }
    },
    [setPage]
  );

  useEffect(() => {
    const getIssueList = async () => {
      try {
        const headers = {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        };

        const response = await axios.get(`${url}?per_page=30&page=${page}`, { headers });
        const issues = response.data;
        const openIssues = issues.filter((issue: any) => issue.state === 'open');
        const sortedIssues = openIssues.sort((a: any, b: any) => b.comments - a.comments);

        setIssueList(sortedIssues);
        if (sortedIssues.length === 0) return;
        setLoading(false);

        console.log('res', sortedIssues);
      } catch (error) {
        setLoading(false);
      }
    };

    getIssueList();
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [page, callback]);

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
          <div ref={targetRef} />
        </div>
      ) : (
        <Loading />
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
