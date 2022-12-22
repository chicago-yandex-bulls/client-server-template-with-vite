import { commonFetchArgs, api } from './api';

import { TUser } from '../../../../../shared/types';
import { TComment, TTheme } from '../../../components/ForumPage/ForumPage.types';
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
    result[user.id || 0] = {
      id: user.id,
      display_name: user.display_name || '',
      first_name: user.first_name || '',
      avatar: user.avatar || '',
      second_name: user.second_name || '',
      phone: user.phone || '',
      login: user.login || '',
      email: user.email || '',
    };
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
    createComment: build.mutation({
      query: (data: Pick<TComment, 'content'> & { authorId: number | null; topicId: number }) => ({
        // TODO: изменить url для прода
        url: 'http://localhost:3001/api/comment/add',
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

            item.comments?.forEach(comment => {
              authorIds.push(comment.authorId || 0);
            });
          });

          const users = await getUsersByFetch(authorIds);

          data.forEach(item => {
            item.author = item.authorId
              ? users[item.authorId]
              : {
                  id: null,
                  display_name: '',
                  first_name: '',
                  avatar: '',
                  second_name: '',
                  phone: '',
                  login: '',
                  email: '',
                };

            item.comments?.forEach(comment => {
              comment.author = comment.authorId
                ? users[comment.authorId]
                : {
                    id: null,
                    display_name: '',
                    first_name: '',
                    avatar: '',
                    second_name: '',
                    phone: '',
                    login: '',
                    email: '',
                  };
            });
          });

          return data;
        },
      }),
      providesTags: ['getTopics'],
    }),
  }),
});

export const { useCreateTopicMutation, useGetTopicsQuery, useCreateCommentMutation } = forumApi;
