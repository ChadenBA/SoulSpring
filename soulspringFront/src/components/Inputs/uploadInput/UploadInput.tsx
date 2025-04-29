import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Tooltip, LinearProgress } from '@mui/material';
import {
  StyledDeleteIcon,
  StyledInputContainer,
  StyledInputTypography,
  StyledPreviewContainer,
  StyledPreviewImage,
  StyledPreviewPdf,
  StyledPreviewVideo,
  StyledUploadIcon,
} from './UploadInput.style';
import { UploadInputProps } from './UploadInput.type';
import { Media } from 'types/models/Media';
import { useAppSelector } from '@redux/hooks';
import { RootState } from '@redux/store';

function UploadInput({ preview, multiple, label, file, onChange, onDelete }: UploadInputProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);
  const uploadProgresses = useAppSelector((state: RootState) => (state as any).upload.progresses);

  const handleOnContainerClick = () => {
    ref.current?.click();
  };

  const getFileURL = (file: File | Media): string => {
    if ('fileName' in file) {
      return file.fileName;
    } else {
      return URL.createObjectURL(file);
    }
  };

  const getFileMimeType = (file: File | Media): string => {
    return 'mimeType' in file ? file.mimeType : file.type;
  };
//fonction pour afficher les fichier
  const FilePreview = ({ file }: { file: File | Media }): JSX.Element => {
    const fileURL = getFileURL(file);
    const mimeType = getFileMimeType(file);

    const fileId =
      (file as File).name + '-' + (file as File).size + '-' + (file as File).lastModified;

    const uploadProgress = uploadProgresses[fileId];

    if (mimeType.startsWith('image/')) {
      return <StyledPreviewImage src={fileURL} alt="File preview" />;
    } else if (mimeType.startsWith('video/')) {
      return (
        <Stack height={'100%'}>
          <StyledPreviewVideo controls>
            <source src={fileURL} type={mimeType} />
          </StyledPreviewVideo>

          {uploadProgress && uploadProgress.progress >= 0 && uploadProgress.progress < 100 && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress.progress}
              sx={{ pt: 1, mt: 0.2 }}
            />
          )}
        </Stack>
      );
    } else if (mimeType === 'application/pdf') {
      return (
        <StyledPreviewPdf data={fileURL}>
          <embed src={fileURL} type="application/pdf" width="100%" height="100%" />
        </StyledPreviewPdf>
      );
    } else if (mimeType.startsWith('audio/')) {
      return <audio controls src={fileURL} style={{ marginTop: '20%', width: '100%' }} />;
    } else {
      return <div>Unsupported file type</div>;
    }
  };

  return (
    <>
      <Stack direction={'column'} spacing={1} width={'100%'}>
        {label && <StyledInputTypography variant="h6">{label}</StyledInputTypography>}

        <StyledInputContainer onClick={handleOnContainerClick}>
          {preview ? (
            <StyledPreviewContainer>
              {file && FilePreview({ file }) ? (
                FilePreview({ file })
              ) : (
                <StyledPreviewImage src={preview} />
              )}
              <Tooltip title={t('common.delete')} arrow>
                <StyledDeleteIcon onClick={onDelete} />
              </Tooltip>
            </StyledPreviewContainer>
          ) : (
            <StyledUploadIcon />
          )}
        </StyledInputContainer>
      </Stack>
      <input
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: 'none' }}
        multiple={multiple}
      />
    </>
  );
}

export default UploadInput;
