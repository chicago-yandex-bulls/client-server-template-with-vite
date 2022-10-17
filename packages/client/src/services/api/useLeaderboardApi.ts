import useBaseApi from './useBaseApi';

export type TUserToLeaderboardData = {
  id: number;
  username: string;
  points: number;
};

export type TUserToLeaderboard = {
  data: TUserToLeaderboardData;
  ratingFieldName: string;
  teamName: string;
};

export type TAllLeaderData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

const useLeaderboardApi = () => {
  const { post } = useBaseApi({ path: '/leaderboard' });

  function addUser(data: TUserToLeaderboard) {
    return post({ endpoint: '/', data });
  }

  function getAll(data: TAllLeaderData) {
    return post({ endpoint: '/all', data });
  }

  function getTeam(data: TAllLeaderData, teamName: string) {
    return post({ endpoint: `/${teamName}`, data });
  }

  return { addUser, getAll, getTeam };
};

export default useLeaderboardApi;
