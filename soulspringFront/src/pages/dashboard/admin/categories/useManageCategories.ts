import { useEffect, useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@redux/hooks';
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '@redux/apis/categories/categoriesApi';
import { showSuccess } from '@redux/slices/snackbarSlice';
import { IError } from 'types/interfaces/Error';
import useError from 'src/hooks/useError';
import { DialogFormNamesEnum } from './CategoriesPage.consts';

export default function useManageCategories() {
  //_____________________ Hooks ____________________//
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  //____________________ State ____________________//
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [deletedCategoryArray, setDeletedCategoryArray] = useState<number[]>([]);

  const isEditMode = Boolean(categoryId);

  //____________________ Form Definition ____________________//
  const categoryFormMethods = useForm<FieldValues>({
    mode: 'onChange',
    shouldFocusError: true,
  });

  //____________________ Field Array ____________________//
  const { fields, prepend, remove } = useFieldArray({
    control: categoryFormMethods.control,
    name: DialogFormNamesEnum.CHILDREN,
  });

  const handleDeleteCategory = (categoryId: number) => {
    setDeletedCategoryArray((prev: number[]) => [...prev, categoryId]);
  };

  //_____________________ API Calls ____________________//
  const [createCategoryApiAction, { isLoading: isCreating }] = useCreateCategoryMutation();

  const [updateCategoryApiAction, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
  } = useGetCategoryByIdQuery(categoryId, {
    skip: !categoryId,
  });

  //_____________________ Error Handling ____________________//
  const { getError } = useError({
    formMethods: categoryFormMethods,
  });

  //_____________________ Data ____________________//
  const category = categoryData?.data;

  //_____________________ Functions ____________________//
  const handleOnEdit = (categoryId: number) => {
    handleResetForm;
    setCategoryId(categoryId);
    setOpen(true);
  };

  const handleResetForm = () => {
    categoryFormMethods.reset({ title: '', children: [] });
  };

  const handleOnAdd = () => {
    handleResetForm;
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCategoryId(undefined);
    setTimeout(handleResetForm, 200);
  };

  const handleSubmit = categoryFormMethods.handleSubmit(async (values) => {
    try {
      if (isEditMode) {
        await updateCategoryApiAction({
          id: Number(categoryId),
          category: values,
          deletedChildren: deletedCategoryArray,
        }).unwrap();
        handleCloseModal();
        dispatch(showSuccess(t('category.update_category_success')));
      } else {
        await createCategoryApiAction(values).unwrap();
        handleCloseModal();
        dispatch(showSuccess(t('category.create_category_success')));
      }
    } catch (error) {
      getError(error as IError);
    }
  });

  //_____________________ Effects __________________
  useEffect(() => {
    if (category) {
      categoryFormMethods.reset({
        title: category.title,
        children: category.children.map((child) => ({
          title: child.title,
          index: child.id,
        })),
      });
    }
  }, [category, categoryFormMethods]);

  return {
    open,
    categoryId,
    isEditMode,
    category,
    isCreating,
    isUpdating,
    isLoadingCategory,
    isFetchingCategory,
    categoryFormMethods,
    handleOnAdd,
    handleOnEdit,
    handleCloseModal,
    handleSubmit,
    fields,
    prepend,
    remove,
    handleDeleteCategory,
  };
}
