import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { InputConfig } from 'types/interfaces/InputConfig';

export enum DialogFormNamesEnum {
  TITLE = 'title',
  CHILDREN = 'children',
  NAME = 'name',
  SUBCATEGORIES = 'subCategories',
}

export const CATEGORIES_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.category',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'category.title_required' },
  },

  children_title: {
    name: 'children',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.sub_category',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'category.children_title_required' },
  },
};
