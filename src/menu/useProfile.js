import { useState, useEffect } from "react";
export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nisi ulogovan!");
        }
        res.json().then((data) => {
          setData(data.admin);
          setLoading(false);
          setUser(data);
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return { loading, data, user };
}
