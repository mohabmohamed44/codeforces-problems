import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          'https://codeforces.com/api/problemset.problems?tags=implementation&from=800&to=3500'
        );
        const { problems } = response.data.result;
        setProblems(problems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const sortedProblems = [...problems].sort((a, b) => a.rating - b.rating);

  return (
    <div className="container">
      <h1>Codeforces Problems</h1>
      <ol className="list-group">
        {sortedProblems.map((problem, index) => (
          <li key={index} className="list-group-item">
            <a
              href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {index + 1}. {problem.name}
            </a>
            <span className="badge badge-primary ml-2">{problem.rating}</span>
            <span className="badge badge-secondary ml-2">{problem.tags.join(', ')}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProblemList;
