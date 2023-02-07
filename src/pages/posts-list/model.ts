import { redirect } from 'atomic-router';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { status } from 'patronum';

import { PostsApi } from '@/shared/api/posts';
import { routes } from '@/shared/config/routing';
import { Post } from '@/shared/types/post';

export const $postsList = createStore<Post[]>([]);

export const modelLoaded = createEvent();
export const postClicked = createEvent<Post>();

export const getPostsListFx = createEffect(PostsApi.getPostsList);

export const $postsLoadingStatus = status({ effect: getPostsListFx });

sample({
  clock: [modelLoaded, routes.postsList.opened],
  target: getPostsListFx,
});

sample({
  clock: getPostsListFx.doneData,
  target: $postsList,
});

redirect({
  clock: postClicked,
  params: ({ id: postId }) => ({ postId }),
  route: routes.post,
});

// Done due to lazy loading.
// Will fire once when this file is loaded (imported)
modelLoaded();
