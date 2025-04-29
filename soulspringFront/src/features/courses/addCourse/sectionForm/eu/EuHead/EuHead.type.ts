export interface EuHeadProps {
  expanded: boolean;
  index: number;
  title: string;
  canDelete: boolean;
  isNewEu: boolean;
  type?: string;
  onChangeExpanded: () => void;
  onCreateEu?: () => void;
  onDeleteEu?: () => void;
  onUpdateEu?: (id: number) => void;
  onAddEu?: () => void;
}
