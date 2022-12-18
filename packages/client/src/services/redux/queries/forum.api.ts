import { commonFetchArgs, api } from './api';

import { TUser } from '../../../../../shared/types';
import { TComment, TTheme } from '../../../components/ForumPage/ForumPage.types';
import { TEMP_DATA } from '../../../components/ForumPage/tempData';
import { arrOnlyUnique } from '../../../utils/arrOnlyUnique';

async function getUsersByFetch(ids: number[]): Promise<{ [id: number]: TUser }> {
  const result: { [id: number]: TUser } = {};

  const uniqueIds = arrOnlyUnique(ids);

  const promises: Promise<TUser>[] = [];

  uniqueIds.forEach(id => {
    promises.push(
      fetch(`https://ya-praktikum.tech/api/v2/user/${id}`, {
        credentials: 'include',
      })
        .then(async res => res.json())
        .catch(
          (): TUser => ({
            id: null,
            display_name: '',
            first_name: '',
            avatar: '',
            second_name: '',
            phone: '',
            login: '',
            email: '',
          })
        )
    );
  });

  const users = await Promise.all(promises);

  users.forEach(user => {
    result[user.id || 0] = user;
  });

  return result;
}

export const forumApi = api.injectEndpoints({
  endpoints: build => ({
    createTopic: build.mutation({
      query: (data: Pick<TTheme, 'title' | 'content'> & { authorId: number | null }) => ({
        // TODO: изменить url для прода
        url: 'http://localhost:3001/api/topic/add',
        method: 'POST',
        body: { data },
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getTopics'],
    }),
    getTopics: build.query<TTheme[], void>({
      query: () => ({
        // TODO: изменить url для прода
        url: 'http://localhost:3001/api/topic',
        method: 'GET',
        ...commonFetchArgs,
        responseHandler: async response => {
          const data: {
            authorId: number;
            content: string;
            createdAt: string;
            id: number;
            title: string;
            updatedAt: string;
            comments?: TComment[];
            author?: TUser;
          }[] = await response.json();

          const authorIds: number[] = [];
          data.forEach(item => {
            authorIds.push(item.authorId);
          });

          const users = await getUsersByFetch(authorIds);

          data.forEach(item => {
            item.author = users[item.authorId];

            //todo Удалить хардкод для комментариев, когда бэк научится их отдавать
            item.comments = TEMP_DATA[1].comments;
          });

          return data;
        },
      }),
      providesTags: ['getTopics'],
    }),
  }),
});

export const { useCreateTopicMutation, useGetTopicsQuery } = forumApi;
