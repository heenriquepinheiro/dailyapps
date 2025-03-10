import classNames from 'classnames';
import type { ReactElement } from 'react';
import React from 'react';

import styles from '../cards/common/Card.module.css';
import type { Post } from '../../graphql/posts';
import { ElementPlaceholder } from '../ElementPlaceholder';
import { TextPlaceholder } from '../widgets/common';
import SquadPostAuthor from '../post/SquadPostAuthor';
import { CardLink } from '../cards/common/Card';
import { combinedClicks } from '../../lib/click';
import { ProfileImageSize } from '../ProfilePicture';

type PostProps = {
  post: Post;
  onLinkClick: (post: Post) => unknown;
};

export const SquadPostListItem = ({
  post,
  onLinkClick,
}: PostProps): ReactElement => {
  return (
    <article
      className={classNames(
        'group relative flex items-start px-4 py-2 hover:bg-surface-hover',
        styles.card,
      )}
    >
      <CardLink
        href={post.commentsPermalink}
        title={post.title}
        {...combinedClicks(() => onLinkClick(post))}
      />
      <div className="flex w-full flex-col">
        {post?.author && (
          <SquadPostAuthor
            className={{
              name: 'text-text-primary typo-callout',
              handle: 'text-text-quaternary typo-callout',
              details: 'flex-1 pr-8',
            }}
            author={post.author}
            size={ProfileImageSize.Large}
            date={post.createdAt}
          />
        )}
        <p className="mr-6 mt-1 line-clamp-3 text-text-primary typo-callout">
          {post.title ?? post.sharedPost.title}
        </p>
      </div>
    </article>
  );
};

const SquadPostListItemPlaceholder = (): ReactElement => (
  <article aria-busy className="relative flex flex-col px-4 py-2">
    <div className="mb-2 flex flex-1 flex-row items-center">
      <ElementPlaceholder className="mt-1 h-10 w-10 rounded-14" />
      <div className="ml-3 mr-2 flex flex-1 flex-col">
        <TextPlaceholder style={{ width: '40%' }} />
        <TextPlaceholder style={{ width: '40%' }} />
      </div>
    </div>
    <TextPlaceholder style={{ width: '80%' }} />
    <TextPlaceholder style={{ width: '80%' }} />
  </article>
);

SquadPostListItem.Placeholder = SquadPostListItemPlaceholder;
