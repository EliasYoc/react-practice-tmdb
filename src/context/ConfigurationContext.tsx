import { createContext, useState, useEffect } from "react";
import { getConfigurationDetails } from "../services/tmdb/tmdbConfiguration";

export const ConfigContext = createContext({});

export const ConfigurationProvider = ({ children }: { children: React.ReactNode }) => {
  const [tmdbConfigurationDetails, setTmdbConfigurationDetails] = useState(null)

  useEffect(() => {
    const getConfiguration = async () => {
      try {
        const res = await getConfigurationDetails()

        const { data } = res
        setTmdbConfigurationDetails(data)

      } catch (error) {
        console.error(error)
      }

    }

    getConfiguration()
    return () => {

    }
  }, [])

  //to build an image url tmdb has base_url and 
  const data = { tmdbConfigurationDetails };
  if (!tmdbConfigurationDetails) return null;
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>;
}