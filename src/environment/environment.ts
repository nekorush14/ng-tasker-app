export const environment = {
  production: false,
  apiBaseUrl: process.env['API_BASE_URL'] || 'http://localhost:3000',
  apiKey: process.env['API_KEY'] || 'mock_api_key',
};
