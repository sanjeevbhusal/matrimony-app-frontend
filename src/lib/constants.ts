let API_URL: string;

if (window.location.hostname === "localhost") {
  // Development environment
  API_URL = "http://localhost:3000";
} else {
  // Production environment
  API_URL = "https://nest-react-production.up.railway.app";
}
export { API_URL };
