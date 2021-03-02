export interface TvShowSummary {
  tvid: string;
  name: string;
}

export interface TvDetails extends TvShowSummary {
  // tvid: number;
  // name: string;
  lang: string;
  official_site: string;
  rating: number;
  image: string;
  summary: string;
}
