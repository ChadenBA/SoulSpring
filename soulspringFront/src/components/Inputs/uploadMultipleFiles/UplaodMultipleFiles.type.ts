import { Dispatch, SetStateAction } from 'react';
import { Media } from 'types/models/Media';

export interface UploadMultipleFilesProps {
  courseId?: string;
  files: FileWithMetadata[] | MediaWithMetadata[];
  euIndex: number;
  loIndex: number;
  isSupplementary: boolean;
  isEditMode?: boolean;
  setFiles: Dispatch<SetStateAction<Record<number, Record<number, FileWithMetadata[]>>>>;
  setDeletedMedia: Dispatch<SetStateAction<string[]>>;
}
export interface FileWithMetadata {
  file: File;
  metadata: {
    isSupplementary: boolean;
  };
}

export interface MediaWithMetadata {
  file: Media;
  metadata: {
    isSupplementary: boolean;
  };
}
