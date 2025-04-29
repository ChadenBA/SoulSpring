import {
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { CategoriesRowProps } from './CategorieRow.type';
import { useState } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import { Delete, Edit } from '@mui/icons-material';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import { GREY } from '@config/colors/colors';
import trash from '@assets/logo/icon-trash.svg';
import { useDeleteCategoryMutation } from '@redux/apis/categories/categoriesApi';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function CategoriesRow({ category, onEdit }: CategoriesRowProps) {
  const [deleteCategory] = useDeleteCategoryMutation();

  const [open, setOpen] = useState(false);

  const [openSubCategories, setOpenSubCategories] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDeleteCategory = async (id: number) => {
    try {
      deleteCategory(id).unwrap();
      dispatch(showSuccess(t('category.delete_category_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    } finally {
      setOpen(false);
    }
  };
  const handleEditClick = (id: number) => {
    onEdit(id);
  };

  return (
    <>
      <TableRow key={category.id}>
        <TableCell>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenSubCategories(!openSubCategories)}
            >
              {openSubCategories ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            {t(category.title)}
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction={'row'} spacing={2}>
            <Tooltip title={t('common.edit')}>
              <Edit color="info" cursor="pointer" onClick={() => handleEditClick(category.id)} />
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <Delete color="error" cursor="pointer" onClick={() => setOpen(true)} />
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}>
          <Collapse in={openSubCategories} timeout="auto" unmountOnExit>
            {category.children.map((subCategory: { id: number; title: string }) => (
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow key={subCategory.id}>
                    <TableCell component="th" scope="row" sx={{ pl: '40px' }}>
                      <Typography variant="caption" sx={{ fontWeight: '600' }}>
                        {t(subCategory.title)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
      <CustomDialogActions
        open={open}
        onAccept={() => handleDeleteCategory(category.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={trash} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {t('category.delete_category')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {t('category.delete_category_confirm')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </>
  );
}
export default CategoriesRow;
