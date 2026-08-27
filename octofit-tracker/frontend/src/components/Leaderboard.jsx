import { useApiData } from '../hooks/useApiData';

function Leaderboard() {
  const { items: entries, loading, error } = useApiData('leaderboard');

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.team?.name || entry.team}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
