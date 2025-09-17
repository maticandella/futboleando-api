type MatchStatus = "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "SUSPENDED" | "CANCELED";
type Winner = "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;

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

export interface MatchArea {
  id: number;
  name: string;
  code: string | null;
  flag: string | null;
}

export interface CompetitionDetail {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string | null;
}

export interface MatchSeasonDetail {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number | null;
  winner: Team | null;
  stages: string[];
}

export interface MatchCoach {
  id: number;
  name: string;
  nationality: string | null;
}

export interface MatchLineupPlayer {
  id: number;
  name: string;
  position: string | null;
  shirtNumber: number | null;
}

export interface MatchTeamStatistics {
  corner_kicks?: number | null;
  free_kicks?: number | null;
  goal_kicks?: number | null;
  offsides?: number | null;
  fouls?: number | null;
  ball_possession?: number | null;
  saves?: number | null;
  throw_ins?: number | null;
  shots?: number | null;
  shots_on_goal?: number | null;
  shots_off_goal?: number | null;
  yellow_cards?: number | null;
  yellow_red_cards?: number | null;
  red_cards?: number | null;
  [key: string]: number | null | undefined;
}

export interface MatchTeamDetail extends Team {
  coach: MatchCoach | null;
  leagueRank: number | null;
  formation: string | null;
  lineup: MatchLineupPlayer[];
  bench: MatchLineupPlayer[];
  statistics: MatchTeamStatistics | null;
}

export type MatchPenalty = Goal;

export interface MatchBooking {
  minute: number;
  injuryTime?: number | null;
  team: Pick<Team, "id" | "name">;
  player: { id: number; name: string };
  card: string;
}

export interface MatchSubstitution {
  minute: number;
  injuryTime?: number | null;
  team: Pick<Team, "id" | "name">;
  playerOut: { id: number; name: string };
  playerIn: { id: number; name: string };
}

export interface MatchOdds {
  homeWin: number | null;
  draw: number | null;
  awayWin: number | null;
}

export interface MatchOfficial {
  id: number;
  name: string;
  type: string;
  nationality: string | null;
}

export interface MatchDetail extends Omit<Match, "competition" | "season" | "homeTeam" | "awayTeam" | "minute"> {
  area: MatchArea;
  competition: CompetitionDetail;
  season: MatchSeasonDetail;
  minute: number | string | null;
  injuryTime: number | null;
  attendance: number | null;
  venue: string | null;
  stage: string | null;
  group: string | null;
  lastUpdated: string;
  homeTeam: MatchTeamDetail;
  awayTeam: MatchTeamDetail;
  penalties: MatchPenalty[];
  bookings: MatchBooking[];
  substitutions: MatchSubstitution[];
  odds: MatchOdds | null;
  referees: MatchOfficial[];
}

export type MatchDetailResponse = MatchDetail;