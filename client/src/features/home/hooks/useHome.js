import { useState } from "react";
import { getLinks, linkClick } from "../services/home.api";

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

  const handleLinkClick = async(linkId) => {
    console.log(linkId)
    try {
      let res = await linkClick({linkId});
      return response;
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  return {
    links,
    loading,
    error,
    fetchLinks,
    handleLinkClick,
  };
};