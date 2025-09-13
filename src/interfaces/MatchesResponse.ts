import { MatchStatus, Winner } from "../types/MatchTypes";

export interface Team {
  id: number;
  name: string;
  shortName: string | null;
  tla: string | null;
  crest: string | null;
}

export interface Score {
  winner: Winner;
  duration: string;
  fullTime: { home: number | null; away: number | null };
  halfTime: { home: number | null; away: number | null };
}

export interface Goal {
  minute: number;
  injuryTime: number | null;
  type: "REGULAR" | "PENALTY" | string;
  team: Pick<Team, "id" | "name">;
  scorer: { id: number; name: string };
  assist: { id: number; name: string } | null;
  score: { home: number; away: number };
}

export interface Match {
  id: number;
  utcDate: string;
  status: MatchStatus;
  minute: string | null;
  matchday: number | null;
  competition: { id: number; name: string; code: string };
  season: { id: number; startDate: string; endDate: string; currentMatchday: number };
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  goals: Goal[];
}

export interface MatchesResponse {
  filters: {
    dateFrom: string;
    dateTo: string;
    permission: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
    played: number;
  };
  matches: Match[];
}