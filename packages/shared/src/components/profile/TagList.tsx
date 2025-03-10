import type { ReactElement } from 'react';
import React from 'react';
import type { InfiniteScrollingProps } from '../containers/InfiniteScrolling';
import InfiniteScrolling from '../containers/InfiniteScrolling';
import {
  Typography,
  TypographyColor,
  TypographyType,
} from '../typography/Typography';
import type { ContentPreference } from '../../graphql/contentPreference';
import { ContentPreferenceType } from '../../graphql/contentPreference';
import { FollowButton } from '../contentPreference/FollowButton';
import { useFeedSettingsEditContext } from '../feeds/FeedSettings/FeedSettingsEditContext';
import { CopyType } from '../sources/SourceActions/SourceActionsFollow';
import { TagListPlaceholder } from './TagListPlaceholder';
import BlockButton from '../contentPreference/BlockButton';

export interface TagListProps {
  scrollingProps: Omit<InfiniteScrollingProps, 'children'>;
  tags: ContentPreference[];
  placeholderAmount?: number;
  isLoading?: boolean;
  emptyPlaceholder?: JSX.Element;
  showBlock?: boolean;
  showFollow?: boolean;
}

export const TagList = ({
  placeholderAmount,
  scrollingProps,
  tags,
  isLoading,
  emptyPlaceholder,
  showBlock = false,
  showFollow = true,
}: TagListProps): ReactElement => {
  const feedSettingsEditContext = useFeedSettingsEditContext();
  const feed = feedSettingsEditContext?.feed;
  const loader = <TagListPlaceholder placeholderAmount={placeholderAmount} />;

  if (tags?.length) {
    return (
      <InfiniteScrolling
        {...scrollingProps}
        aria-label="source-list"
        placeholder={loader}
        className="gap-2"
      >
        {tags.map((tag) => (
          <div key={tag.referenceId} className="flex gap-2">
            <Typography
              className="flex-1"
              type={TypographyType.Callout}
              bold
              color={TypographyColor.Secondary}
            >
              #{tag.referenceId}
            </Typography>
            {showBlock && (
              <BlockButton
                feedId={feed?.id}
                entityId={tag.referenceId}
                entityName={`@${tag.referenceId}`}
                entityType={ContentPreferenceType.Keyword}
                status={tag.status}
              />
            )}
            {showFollow && (
              <FollowButton
                feedId={feed?.id}
                entityId={tag.referenceId}
                type={ContentPreferenceType.Keyword}
                status={tag.status}
                entityName={`@${tag.referenceId}`}
                showSubscribe={false}
                copyType={CopyType.Custom}
              />
            )}
          </div>
        ))}
      </InfiniteScrolling>
    );
  }

  if (isLoading) {
    return loader;
  }

  return emptyPlaceholder ?? loader;
};
