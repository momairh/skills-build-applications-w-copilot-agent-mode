import { useApiData } from '../hooks/useApiData';

function Activities() {
  const { items: activities, loading, error } = useApiData('activities');

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">Error loading activities: {error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name || activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
