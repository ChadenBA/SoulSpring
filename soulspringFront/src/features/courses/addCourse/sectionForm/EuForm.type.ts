import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './eu/Eu.type';
import { Dispatch, SetStateAction } from 'react';
import { FileWithMetadata } from '@components/Inputs/uploadMultipleFiles/UplaodMultipleFiles.type';

export interface EUFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, Record<number, FileWithMetadata[]>>>>;
  isFetching?: boolean;
  handleAddEU?: () => void;
  files: Record<number, Record<number, FileWithMetadata[]>>;
  courseId?: string;
}
