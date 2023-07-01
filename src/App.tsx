import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <>{message}</>;
}

export default App;
