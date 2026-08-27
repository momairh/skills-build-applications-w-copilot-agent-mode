import { useApiData } from '../hooks/useApiData';

function Teams() {
  const { items: teams, loading, error } = useApiData('teams');

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">Error loading teams: {error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                {(team.members || [])
                  .map((member) => member.name || member)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
