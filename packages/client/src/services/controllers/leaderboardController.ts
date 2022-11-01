import { TLeaders } from '../../components/LeaderboardPage/types';
import { setIsLoading } from '../../store/commonSlice';
import { useAppDispatch } from '../../store/hooks';
import useLeaderboardApi, { TUserToLeaderboardData } from '../api/useLeaderboardApi';

export const leaderboardController = () => {
  const { addUser, getAll, getTeam } = useLeaderboardApi();
  const dispatch = useAppDispatch();
  const ALL_LEADERBOARD_DATA = {
    ratingFieldName: 'points',
    cursor: 0,
    limit: 10,
  };

  function addUserToLeaderboard(data: TUserToLeaderboardData, teamName = 'ChicagoTeam') {
    addUser({ data, ratingFieldName: 'points', teamName })
      .then(r => r.json())
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }

  function getAllLeaderboard(callback: (leaders: TLeaders) => void) {
    dispatch(setIsLoading(true));
    getAll(ALL_LEADERBOARD_DATA)
      .then(r => r.json())
      .then(r => callback(r))
      .catch(e => console.error(e))
      .finally(() => dispatch(setIsLoading(false)));
  }

  function getTeamLeaderboard(callback: (leaders: TLeaders) => void) {
    dispatch(setIsLoading(true));
    getTeam(ALL_LEADERBOARD_DATA)
      .then(r => r.json())
      .then(r => callback(r))
      .catch(e => console.error(e))
      .finally(() => dispatch(setIsLoading(false)));
  }

  return { addUserToLeaderboard, getAllLeaderboard, getTeamLeaderboard };
};
