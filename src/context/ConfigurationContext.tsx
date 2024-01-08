import { createContext, useState, useEffect } from "react";
import { getConfigurationTMDB } from "../services/tmdb/tmdbConfiguration";

export const ConfigContext = createContext({});

export const ConfigurationProvider = ({ children }: { children: React.ReactNode }) => {
  const [tmdbConfigurationDetails, setTmdbConfigurationDetails] = useState(null);
  const [tmdbConfigurationJobs, setTmdbConfigurationJobs] = useState(null);

  useEffect(() => {
    const getConfiguration = async () => {
      try {
        const res = await getConfigurationTMDB();
        const jobsRes = await getConfigurationTMDB('/jobs');

        const { data } = res
        const { data: jobsData } = jobsRes
        setTmdbConfigurationDetails(data)
        setTmdbConfigurationJobs(jobsData)

      } catch (error) {
        console.error(error)
      }

    }

    getConfiguration()
    return () => {

    }
  }, [])

  //to build an image url tmdb has base_url and 
  const data = { tmdbConfigurationDetails, tmdbConfigurationJobs };
  if (!tmdbConfigurationDetails) return null;
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>;
}