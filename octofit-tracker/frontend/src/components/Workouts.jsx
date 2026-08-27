import { useApiData } from '../hooks/useApiData';

// Endpoint: https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts
function Workouts() {
  const { items: workouts, loading, error } = useApiData('workouts');

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
