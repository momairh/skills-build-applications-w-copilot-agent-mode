// Requires VITE_CODESPACE_NAME to be defined in the environment (e.g. octofit-tracker/frontend/.env.local)
// so requests can reach the forwarded Codespaces port instead of falling back to localhost.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL =
  codespaceName && codespaceName !== 'undefined'
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

export function getApiUrl(component) {
  return `${API_BASE_URL}/api/${component}/`;
}

// Accepts either a plain array response or a paginated { results: [...] } / { data: [...] } response
export function extractList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }
  return [];
}
