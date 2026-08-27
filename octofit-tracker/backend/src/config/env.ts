const codespaceName = process.env.CODESPACE_NAME;

export const port = 8000;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;
