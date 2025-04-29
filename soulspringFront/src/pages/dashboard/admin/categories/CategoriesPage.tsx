import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BodyCard from '@components/cards/bodyCard/BodyCard';
import CategoriesTable from './categoriesTable/CategoriesTable';
import CustomFormDialog from '@components/dialogs/customFormDialog/CustomFormDialog';
import FallbackLoader from '@components/fallback/FallbackLoader';
import useManageCategories from './useManageCategories';
import Link from '@components/typographies/link/link';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { CATEGORIES_FORM_CONFIG, DialogFormNamesEnum } from './CategoriesPage.consts';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import { Children } from 'types/models/Category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CategoriesPage() {
  const { t } = useTranslation();

  const {
    open,
    isEditMode,
    isLoadingCategory,
    isFetchingCategory,
    category,
    handleOnAdd,
    handleOnEdit,
    handleCloseModal,
    categoryFormMethods,
    isUpdating,
    isCreating,
    handleSubmit,
    fields,
    prepend,
    remove,
    handleDeleteCategory,
  } = useManageCategories();

  return (
    <BodyCard
      title={t('category.categories')}
      buttonText={t('category.add_category')}
      onClick={handleOnAdd}
    >
      <CategoriesTable onEdit={handleOnEdit} />
      <CustomFormDialog
        open={open}
        handleClose={handleCloseModal}
        title={isEditMode ? t('category.edit_category') : t('category.add_category')}
      >
        {isLoadingCategory ||
        isFetchingCategory ||
        ((fields.length <= 0 && isEditMode && category?.children?.length) ?? 0 > 0) ? (
          <FallbackLoader />
        ) : (
          <FormProvider {...categoryFormMethods}>
            <Stack spacing={2}>
              <CustomTextField
                config={{
                  ...CATEGORIES_FORM_CONFIG.title,
                  hasLabel: false,
                  defaultValue: category?.title ?? GLOBAL_VARIABLES.EMPTY_STRING,
                }}
              />
              <Link onClick={() => prepend({ title: GLOBAL_VARIABLES.EMPTY_STRING })}>
                <Stack direction="row" alignItems={'center'}>
                  <AddCircleOutlineIcon fontSize="small" sx={{ marginRight: '1px' }} />
                  <span>{t('category.add_sub_category')}</span>
                </Stack>
              </Link>

              {fields.map((field, index) => (
                <Stack key={field.id} direction="row" spacing={1} alignItems="center">
                  <CustomTextField
                    config={{
                      ...CATEGORIES_FORM_CONFIG.children_title,
                      name: `${DialogFormNamesEnum.CHILDREN}[${index}].${DialogFormNamesEnum.TITLE}`,
                      hasLabel: false,
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      remove(index);
                      const deletedChild = fields[index] as unknown as Children;
                      if (deletedChild.index) handleDeleteCategory(deletedChild.index);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ))}

              <CustomLoadingButton
                isLoading={isCreating || isUpdating}
                onClick={handleSubmit}
                contained
              >
                {isEditMode ? t('common.update') : t('common.save')}
              </CustomLoadingButton>
            </Stack>
          </FormProvider>
        )}
      </CustomFormDialog>
    </BodyCard>
  );
}

export default CategoriesPage;
