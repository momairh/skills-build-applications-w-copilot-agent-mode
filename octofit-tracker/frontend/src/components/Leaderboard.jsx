import { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '')}-8000.app.github.dev/api/leaderboard`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((entry) => (
          <li key={entry._id}>
            {entry.username} - {entry.score} points
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
