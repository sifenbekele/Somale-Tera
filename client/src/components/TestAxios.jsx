import { useEffect, useState } from "react";
import Axios from "../common/Axios"; // adjust path if needed

const TestAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/protected"); // your test endpoint
        setData(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Axios Test</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TestAxios;
