import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { StyledArrowIcon } from '../Eu.style';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { useTranslation } from 'react-i18next';
import { Edit } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EuHeadProps } from './EuHead.type';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function EuHead({
  index,
  expanded,
  title,
  canDelete,
  isNewEu,
  onChangeExpanded,
  onDeleteEu,
  onUpdateEu,
  type,
  onAddEu,
}: EuHeadProps) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <StyledArrowIcon
          onClick={onChangeExpanded}
          expanded={expanded ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
        />
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          {isNewEu ? (
            <>
              <Typography variant="h3" color="primary">
                {type} : {title}
              </Typography>
              <Tooltip title={t('eu.add')}>
                <IconButton onClick={onAddEu} color="success">
                  <AddCircleOutlineOutlinedIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Typography variant="h3" color="primary">
              {title}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={1}>
        {!isNewEu && (
          <Tooltip title={t('section.update')}>
            <IconButton color="info" onClick={() => onUpdateEu && onUpdateEu(index)}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={t('section.delete')}>
          <IconButton
            onClick={onDeleteEu}
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete ? theme.palette.error.main : theme.palette.action.disabled,
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default EuHead;
