const getCodespaceName = () => {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return process.env.REACT_APP_CODESPACE_NAME;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.endsWith('.app.github.dev')) {
      const match = hostname.match(/^(.*)-8000\.app\.github\.dev$/);
      if (match) {
        return match[1];
      }
    }
  }

  return null;
};

const codespaceName = getCodespaceName();
export const baseApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const buildApiUrl = (component) => `${baseApiUrl}/${component}/`;