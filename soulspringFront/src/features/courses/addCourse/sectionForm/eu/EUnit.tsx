import { Divider } from '@mui/material';
import { useState } from 'react';
import EuHead from './EuHead/EuHead';
import { ModuleRoot } from './Eu.style';
import EuBody from './euBody/EuBody';
import { EuProps } from './Eu.type';
import { Quiz } from 'types/models/Quiz';
import { useAppDispatch } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import { useTranslation } from 'react-i18next';
import { useUpdateEuMutation } from '@redux/apis/courses/coursesApi';
import { useParams } from 'react-router-dom';

function EUnit({
  couseId,
  field,
  files,
  euIndex,
  canDelete,
  euFormMethods,
  isEditMode,
  type,
  loIndex,
  onAddEu,
  setFiles,
  handleAddAnswer,
  handleAddQuestion,
  handleRemoveAnswer,
  handleRemoveQuestion,
  handleRemoveEu,
  handleAddEuApi,
  handleAddLearningObject,
}: EuProps) {
  // Destructing the questions from the form methods

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { courseId } = useParams();

  const learningObjects = field?.learningObjects ?? [];

  const quiz = learningObjects[0]?.quiz as Quiz | undefined;

  const questions = quiz?.questions ?? [];

  const [_, setOpen] = useState(false);
  // State Declaration
  const [expanded, setExpanded] = useState(isEditMode ? true : false);

  const [deletedMedia, setDeletedMedia] = useState<string[]>([]);

  const isNewSection = !field?.id || !field?.title || !field?.learningObjects[0]?.title;
  const handleChangeExpand = () => setExpanded((prev) => !prev);

  const handleDeleteOrRemoveSection = () => {
    isEditMode && !isNewSection ? setOpen(true) : handleRemoveEu(euIndex);
  };
  //watch the field title
  const title = euFormMethods.watch(`eu.${euIndex}.title`);

  const [updateEuApi, { isLoading }] = useUpdateEuMutation();

  const handleUpdateEuApi = async (index: number) => {
    const result = await euFormMethods.trigger();

    if (result) {
      const values = euFormMethods.getValues();
      const euId = values.eu[index].euId ?? 0;
      const sectionData = values.eu[index];

      try {
        // Update Section api call
        await updateEuApi({
          euId,
          euData: sectionData,
          files: { [0]: files[euIndex] },
          deletedMedia,
          courseId,
        }).unwrap();
        // Dispatch success Snackbar
        dispatch(showSuccess(t('section.update_success')));
        setDeletedMedia([]);
        //dispatch(courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']));
      } catch (error) {
        // Dispatch error Snackbar
        dispatch(showError(t('errors.general_error')));
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ModuleRoot spacing={2} mb={1} mt={1}>
        <EuHead
          canDelete={canDelete}
          expanded={expanded}
          index={euIndex}
          isNewEu={isNewSection}
          title={title}
          onCreateEu={handleAddEuApi}
          onChangeExpanded={handleChangeExpand}
          onDeleteEu={handleDeleteOrRemoveSection}
          onUpdateEu={handleUpdateEuApi}
          type={type}
          onAddEu={onAddEu}
        />
        <Divider />
        <EuBody
          courseId={couseId}
          euIndex={euIndex}
          expanded={expanded}
          field={field}
          files={files}
          setFiles={setFiles}
          handleAddAnswer={handleAddAnswer}
          handleAddQuestion={handleAddQuestion}
          handleRemoveAnswer={handleRemoveAnswer}
          handleRemoveEu={handleRemoveEu}
          handleRemoveQuestion={handleRemoveQuestion}
          handleAddLearningObject={handleAddLearningObject}
          loIndex={loIndex}
          questions={questions}
          sectionFormMethods={euFormMethods}
          setDeletedMedia={setDeletedMedia}
          isEditMode={isEditMode}
        />
      </ModuleRoot>
    </>
  );
}

export default EUnit;
