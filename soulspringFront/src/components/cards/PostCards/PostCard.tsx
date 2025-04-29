import React, { useState } from 'react';
import { Post } from '../../../types/models/Post';
import { Comment } from '../../../types/models/Comment';
import {
  StyledPostCardRoot,
  StyledPostCardTitle,
  StyledPostCardContent,
  StyledPostCardFooter,
  MetaText,
  FooterActions,
  AuthorAvatar,
  AuthorName,
  CommentCard,
  CommentText,
  CommentAuthor,
  CommentActions,
  CenteredWrapper
} from './PostCard.styles';

import {
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnLikePostMutation,
  useBlockPostMutation,
  useUnblockPostMutation
} from '@redux/apis/Post/PostApi';

import {
  useGetCommentbypostQuery,
  useCreateCommentMutation,
  useDeletecOMMENTMutation,
  useLikeCommentMutation,
  useUnLikeCommentMutation,
  useUpdateCommentMutation,
  useBlockCommentMutation,
  useUnblockCommentMutation
} from '@redux/apis/Comment/CommentApi';

import {
  Button,
  Stack,
  Typography,
  TextField,
  Divider
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  currentUser: any;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeletecOMMENTMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnLikeCommentMutation();
  const [blockPost] = useBlockPostMutation();
  const [unblockPost] = useUnblockPostMutation();
  const [blockComment] = useBlockCommentMutation();
  const [unblockComment] = useUnblockCommentMutation();

  const { data: commentData } = useGetCommentbypostQuery(post._id);
  const { t } = useTranslation();

  const handleDeletePost = async () => {
    try {
      await deletePost(post._id).unwrap();
      toast.success(t('post.postDeletedSuccess'));
    } catch {
      toast.error(t("post.postDeletedError"));
    }
  };

  const handleEditPost = () => setIsFormOpen(true);

  const handleUpdatePost = async () => {
    try {
      await updatePost({ id: post._id, body: { title: editTitle, content: editContent } }).unwrap();
      toast.success(t("post.postUpdated"));
      setIsFormOpen(false);
    } catch {
      toast.error(t("post.postUpdateError"));
    }
  };

  const handleLike = async () => {
    try {
      await likePost(post._id).unwrap();
      toast.success(t("post.postLiked"));
    } catch {
      toast.error(t('post.postLikeError'));
    }
  };

  const handleUnlike = async () => {
    try {
      await unLikePost(post._id).unwrap();
      toast.info(t("post.postUnliked"));
    } catch {
      toast.error(t("post.postUnlikeError"));
    }
  };

  const handleSubmitComment = async () => {
    try {
      await createComment({
        post: post._id,
        content: newComment,
        autheur: currentUser?.id,
      }).unwrap();
      setNewComment('');
      toast.success(t("post.commentAdded"));
    } catch {
      toast.error(t("post.commentAddError"));
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id).unwrap();
      toast.success(t("post.commentDeleted"));
    } catch {
      toast.error(t("post.commentDeleteError"));
    }
  };

  const handleUpdateComment = async () => {
    try {
      if (!editingCommentId) return;
      await updateComment({
        id: editingCommentId,
        body: { content: editedCommentContent }
      }).unwrap();
      setEditingCommentId(null);
      setEditedCommentContent('');
      toast.success(t("post.commentUpdated"));
    } catch {
      toast.error(t("post.commentUpdateError"));
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      await likeComment(commentId).unwrap();
      toast.success(t("post.commentLiked"));
    } catch {
      toast.error(t("post.commentLikeError"));
    }
  };

  const handleUnlikeComment = async (commentId: number) => {
    try {
      await unlikeComment(commentId).unwrap();
      toast.info(t("post.commentUnliked"));
    } catch {
      toast.error(t("post.commentUnlikeError"));
    }
  };

  const handleBlockPost = async () => {
    try {
      await blockPost(post._id).unwrap();
      toast.warning(t("post.postBlocked"));
    } catch {
      toast.error(t("post.postBlockError"));
    }
  };

  const handleUnblockPost = async () => {
    try {
      await unblockPost(post._id).unwrap();
      toast.success(t("post.postUnblocked"));
    } catch {
      toast.error(t("post.postUnblockError"));
    }
  };

  const handleBlockComment = async (commentId: number) => {
    try {
      await blockComment(commentId).unwrap();
      toast.warning(t("post.commentBlocked"));
    } catch {
      toast.error(t("post.commentBlockError"));
    }
  };

  const handleUnblockComment = async (commentId: number) => {
    try {
      await unblockComment(commentId).unwrap();
      toast.success(t("post.commentUnblocked"));
    } catch {
      toast.error(t("post.commentUnblockError"));
    }
  };

  const isLikedByCurrentUser = post.likes?.includes(currentUser?.id);
  return (
    <CenteredWrapper>

      <StyledPostCardRoot>
        {/* Author Info */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <AuthorAvatar src={post.autheur?.profilePicture?.url} />
          <Stack>
            <AuthorName>{post.autheur?.name} {post.autheur?.lastname}</AuthorName>
            <MetaText>{dayjs(post.createdAt).fromNow()}</MetaText>
          </Stack>
        </Stack>

        {/* Title and Content OR Edit Form */}
        {isFormOpen ? (
          <Stack spacing={2} mb={2}>
            <TextField
              label={t("post.title")}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label={t("post.content")}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleUpdatePost}>{t("post.Save")}</Button>
              <Button variant="outlined" onClick={() => setIsFormOpen(false)}>{t("post.Cancel")}</Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <StyledPostCardTitle>{post.title}</StyledPostCardTitle>
            <StyledPostCardContent>{post.content}</StyledPostCardContent>
          </>
        )}

        {/* Footer Actions */}
        <StyledPostCardFooter>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} margin={2}>
              <Typography variant="body2">{post.likes?.length || 0} {t("post.likes")}</Typography>
              <Typography variant="body2">{commentData?.data?.length ?? 0} {t("post.comments")}</Typography>
            </Stack>

            <FooterActions direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={isLikedByCurrentUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={isLikedByCurrentUser ? handleUnlike : handleLike}
              >
                {t(isLikedByCurrentUser ? 'post.unlike' : 'post.like')}
              </Button>

              <Button
                variant="outlined"
                startIcon={<CommentIcon />}
                onClick={() => setShowAllComments((prev) => !prev)}
              >
                {t(showAllComments ? 'post.Hide_Comments' : 'post.comment')}
              </Button>


              {currentUser?.role === 'admin' ? (
                post.isBlocked ? (
                  <Button
                    color="success"
                    variant="outlined"
                    startIcon={<BlockIcon />}

                    onClick={handleUnblockPost}
                  >
                    {t("post.Unblock")}

                  </Button>
                ) : (
                  <Button
                    color="warning"
                    variant="outlined"
                    startIcon={<BlockIcon />}

                    onClick={handleBlockPost}
                  >
                    {t("post.Block")}

                  </Button>
                )
              ) : (
                post.autheur?._id === currentUser.id && (
                  <>
                    <Button startIcon={<EditIcon />} onClick={handleEditPost}>
                      {t("post.Edit")}
                    </Button>
                    <Button startIcon={<DeleteIcon />} color="error" onClick={handleDeletePost}>
                      {t("post.Delete")}
                    </Button>
                  </>
                )
              )}

            </FooterActions>
          </Stack>
        </StyledPostCardFooter>

        <Divider sx={{ my: 2 }} />
        {/* Comments */}
        <Stack spacing={2}>
          {(showAllComments
            ? commentData?.data
            : commentData?.data?.slice(0, 1)
          )?.map((comment: Comment) => {
            const isLiked = comment.likes?.includes(currentUser.id);
            const isOwner = comment.autheur?._id === currentUser.id;

            return (


              <CommentCard key={comment._id}>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <AuthorAvatar src={comment.autheur?.profilePicture?.url} />
                    <Stack spacing={0}>
                      <CommentAuthor>
                        {comment.autheur?.name} {comment.autheur?.lastname}
                      </CommentAuthor>
                      <MetaText>{dayjs(comment.createdAt).fromNow()}</MetaText>
                    </Stack>
                  </Stack>

                  {/* Editable or Readonly Body */}
                  {editingCommentId === comment._id ? (
                    <TextField
                      value={editedCommentContent}
                      onChange={(e) => setEditedCommentContent(e.target.value)}
                      multiline
                      fullWidth
                      rows={2}
                      size="small"
                    />
                  ) : (
                    <CommentText>{comment.content}</CommentText>
                  )}

                  {/* Actions */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <CommentActions>
                      <Button
                        size="small"
                        onClick={() =>
                          isLiked
                            ? handleUnlikeComment(comment._id)
                            : handleLikeComment(comment._id)
                        }
                        startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      >
                        {comment.likes?.length || 0}
                      </Button>

                      {isOwner && (
                        <>
                          {editingCommentId === comment._id ? (
                            <>
                              <Button
                                size="small"
                                color="primary"
                                onClick={handleUpdateComment}
                              >

                                {t("post.Save")}
                              </Button>
                              <Button
                                size="small"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditedCommentContent('');
                                }}
                              >

                                {t("post.Cancel")}
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setEditedCommentContent(comment.content);
                              }}
                            >

                              {t("post.Update")}
                            </Button>
                          )}

                          <Button
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteComment(comment._id)}
                          >

                            {t("post.Delete")}
                          </Button>

                        </>

                      )}
                      {currentUser?.role === 'admin' && (
                        comment.isBlocked ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            startIcon={<BlockIcon />}

                            onClick={() => handleUnblockComment(comment._id)}
                          >

                            {t("post.Unblock")}
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            color="warning"
                            startIcon={<BlockIcon />}

                            onClick={() => handleBlockComment(comment._id)}
                          >

                            {t("post.Block")}
                          </Button>
                        )
                      )}

                    </CommentActions>
                  </Stack>
                </Stack>
              </CommentCard>


            );
          })}

          {/* Comment Input */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="small"
            />
            <Button onClick={handleSubmitComment} variant="contained" endIcon={<SendIcon />}>
              {t("post.Send")}
            </Button>
          </Stack>
        </Stack>
      </StyledPostCardRoot>
    </CenteredWrapper>

  );
};

export default PostCard;