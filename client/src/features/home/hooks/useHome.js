import { useState } from "react";
import { getLinks } from "../services/home.api";

export const useHome = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = async ({ username }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLinks({ username });
      setLinks(response.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    links,
    loading,
    error,
    fetchLinks,
  };
};