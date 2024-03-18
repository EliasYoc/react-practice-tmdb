interface TheShowImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ITmdbPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}
export interface IDetailsConfig {
  change_keys: string[];
  images: {
    backdrop_sizes: string[];
    base_url: string;
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    secure_base_url: string;
    still_sizes: string[];
  };
}

export type IJobsConfig = { department: string; jobs: string[] }[];

export interface IDiscoverMoviesSeries {
  page: number;
  results: IMovieSerieMiniDetail[];
  total_pages: number;
  total_results: number;
}

export interface IMovieSerieMiniDetail {
  adult?: boolean;
  first_air_date?: string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  name?: string;
  origin_country?: string[];
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieSerieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  first_air_date?: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: Date;
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: null;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  release_date?: Date;
  revenue?: number;
  runtime?: number;
  seasons?: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title?: string;
  type?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  season_number: number;
  vote_average: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
