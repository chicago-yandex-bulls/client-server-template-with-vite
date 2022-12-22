import { api, commonFetchArgs } from './api';

import { RATING_FIELD_NAME, TEAM_NAME_LEADERBOARD } from '../../../../../shared/consts/common';

export const ALL_LEADERBOARD_DATA = {
  ratingFieldName: RATING_FIELD_NAME,
  cursor: 0,
  limit: 10,
};

export const leaderboardApi = api.injectEndpoints({
  endpoints: build => ({
    addUser: build.mutation({
      query: data => ({
        url: 'leaderboard',
        method: 'POST',
        body: { teamName: TEAM_NAME_LEADERBOARD, ratingFieldName: RATING_FIELD_NAME, data },
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getLeaderboard'],
    }),
    getAll: build.query({
      query: () => ({
        url: `leaderboard/${TEAM_NAME_LEADERBOARD}`,
        method: 'POST',
        body: ALL_LEADERBOARD_DATA,
        ...commonFetchArgs,
      }),
      providesTags: ['getLeaderboard'],
    }),
  }),
});

export const { useAddUserMutation, useGetAllQuery } = leaderboardApi;
