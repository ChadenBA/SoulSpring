import { FieldArrayWithId } from 'react-hook-form';
import { FormValues } from '../eu/Eu.type';
import { SyntheticEvent } from 'react';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';

export interface SectionTabsProps {
  activeEu: number;
  eu: FieldArrayWithId<FormValues, 'eu', 'id'>[];
  handleChange: (_: SyntheticEvent, newValue: number) => void;
  onAddNewEu: (type: EducationalUnitEnum, index: number, isEditMode?: boolean) => void;
  setActiveEu?: (_: number) => void;
  setSelectedEu: (id: number) => void;
}
