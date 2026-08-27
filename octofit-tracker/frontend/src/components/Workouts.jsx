import { useEffect, useState } from 'react';
import { extractList } from '../config/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const WORKOUTS_URL = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(WORKOUTS_URL)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => { setWorkouts(extractList(data)); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
