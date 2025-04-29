import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  CircularProgress
} from '@mui/material';
import { useCreatePostMutation} from '@redux/apis/Post/PostApi'
import { Post } from '../../types/models/Post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
interface Props {
  open: boolean;
  handleClose: () => void;
}
const CreatePostForm: React.FC<Props> = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { t } = useTranslation();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async () => {
    const newPost: Post = {
      
      title,
      content,
      autheur: {
        name: 'Anonymous',
        lastname: 'User',
        profilePicture: { url: '', publicId: '' }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commentCount: 0
    };

    try {
      await createPost(newPost).unwrap();
      handleClose();
      setTitle('');
      setContent('');
      toast.success(t('post.Post_created_successfully'));

    } catch (err) {
      console.error(t('post.Failed_to_create_post'), err);
      toast.error(t('post.Failed_to_create_post'));
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{t("post.Create_a_New_Post")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("post.title")}
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label={t("post.content")}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={isLoading}>
        {t("post.Cancel")}
          
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} /> : t("post.Submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostForm;
