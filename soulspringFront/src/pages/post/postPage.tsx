import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useGetPostsQuery } from '@redux/apis/Post/PostApi';
import PostCard from '../../components/cards/PostCards/PostCard';
import SearchSection from '@features/courses/searchSection/SearchSection';
import CustomPagination from '@components/customPagination/CustomPagination';
import usePagination from 'src/hooks/usePagination';
import useDebounce from 'src/hooks/useDebounce';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { RootState } from '@redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style';
import Header from '@components/header/Header';
import CreatePostForm from './CreatePostForm';
import { setSearchQuery } from '@redux/slices/appSlice'; // Adjust path if needed

const PostPage: React.FC = () => {
  const dispatch = useDispatch();
  const { queryParams, handlePageChange ,     handleSearchChange,  } = usePagination();
  const debouncedSearchQuery = useDebounce(queryParams.keyword, GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM);
  const { t } = useTranslation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const searchValue = useSelector((state: RootState) => state.appSlice.searchQuery);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const searchQuery = useSelector((state: RootState) => state.appSlice.searchQuery);

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log('Debounced search query:', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const { data, isLoading } = useGetPostsQuery({
    page: queryParams.page,
    limit: 5,
    keyword: debouncedSearchQuery,
  });

  const hasResults = data?.data && data.data.length > 0;
  const noResultsMessage = !isLoading && !hasResults && debouncedSearchQuery !== '';

  return (
    <StackWithBackground>
      <Header />

      <Stack spacing={4} sx={{ padding: 4 }}>
        {/* Create Post Button */}
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" onClick={handleOpenForm}>
            {t("post.Create_post")}
          </Button>
        </Stack>

        <CreatePostForm open={isFormOpen} handleClose={handleCloseForm} />

        {/* Search Bar */}
        <Stack spacing={10} sx={{ padding: 10 }}>
        <SearchSection
              handleSearchChange={handleSearchChange}
              searchValue={queryParams.keyword}
            />
        </Stack>

        {noResultsMessage ? (
          <Typography variant="h6" color="textSecondary" align="center">
            {t('home.no_posts_found_by_search')}
          </Typography>
        ) : (
          <>
            <Stack spacing={3}>
              {data?.data?.map((post) => (
                <PostCard key={post._id} post={post} currentUser={currentUser} />
              ))}
            </Stack>

            {data?.meta?.totalPages > 1 && (
              <Stack direction="row" justifyContent="center" mt={4}>
                <CustomPagination
                  page={queryParams.page}
                  count={data.meta.totalPages}
                  isLoading={isLoading}
                  handlePageChange={handlePageChange}
                />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </StackWithBackground>
  );
};

export default PostPage;
