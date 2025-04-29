import { ChangeEvent, MouseEvent } from 'react';
import { Media } from 'types/models/Media';

export interface UploadInputProps {
  preview: string | null;
  label?: string;
  file?: File | Media | null ;
  isEditMode?: boolean;
  

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (event: MouseEvent<SVGSVGElement>, index?: number) => void;
  multiple?: boolean;
}
