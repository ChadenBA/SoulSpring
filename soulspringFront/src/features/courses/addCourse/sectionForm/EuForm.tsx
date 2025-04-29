import { t } from 'i18next';

import { FieldArrayWithId, FormProvider } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import MainTabs from './mainTabs/MainTabs';
import FallbackLoader from '@components/fallback/FallbackLoader';
import SectionTabs from './sectionTabs/SectionTabs';
import useEducationalUnitForm from './useEducationalUnitForm';

import EUnit from './eu/EUnit';
import { EUFormProps } from './EuForm.type';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';
import { FormValues } from './eu/Eu.type';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

function EducationalUnitForm({
  courseId,
  files,
  euFormMethods,
  isEditMode,
  isFetching,
  setFiles,
  handleAddEU,
}: EUFormProps) {
  const {
    fields,
    handleAddAnswer,
    handleAddEducationalUnit,
    handleAddQuestion,
    handleRemoveAnswer,
    handleRemoveEducationalUnit,
    handleRemoveQuestion,
    handleAddLearningObject,
  } = useEducationalUnitForm({ euFormMethods });

  //______________________ Local State ______________________
  const [euState, setEuState] = useState({
    activeEu: 0,
    selectedEu: 0,
    currentId: 0,
    deletedEu: false,
    newEuAdded: false,
    lastDeletedAddedEuType: GLOBAL_VARIABLES.EMPTY_STRING,
    activeTab: 0,
    oldValues: -1,
  });

  //______________________ Local State ______________________
  const [euList, setEuList] = useState<FieldArrayWithId<FormValues, 'eu', 'id'>[]>(
    fields.filter((field) => field.type.toLocaleUpperCase() === EducationalUnitEnum.BASIC),
  );

  //______________________ Component SideEffect ______________________
  //-- Set the current index of the educational unit
  useEffect(() => {
    if (isEditMode) {
      const index = fields.findIndex((field) => field.id === (euState.selectedEu || euList[0]?.id));
      setEuState((prev) => ({ ...prev, currentId: index === -1 ? 0 : index }));
    }
  }, [euList, fields, isEditMode, euState.selectedEu]);

  //-- Set the current index of the educational unit
  useEffect(() => {
    if (euState.newEuAdded || euState.deletedEu) {
      if (euState.newEuAdded) {
        handleChangeTab(null, handleTypeByIndex(fields[fields.length - 1].type));
        setEuState((prev) => ({
          ...prev,
          selectedEu: getLastIdByType(prev.lastDeletedAddedEuType),
          activeEu: getCountByType(prev.lastDeletedAddedEuType) - 1,
          newEuAdded: false,
          deletedEu: false,
        }));
      } else {
        handleChangeTab(null, handleTypeByIndex(euState.lastDeletedAddedEuType));
        setEuState((prev) => ({
          ...prev,
          activeEu: getCountByType(prev.lastDeletedAddedEuType) - 1,
          newEuAdded: false,
          deletedEu: false,
        }));
      }
    }
  }, [euState.newEuAdded, euState.deletedEu, fields]);

  //______________________ Event Handlers ______________________
  //-- Handle index changes
  const handleIndexChange = useCallback((index: number): string => {
    switch (index) {
      case 0:
        return 'BASIC';
      case 1:
        return 'INTERMEDIATE';
      case 2:
        return 'ADVANCED';
      default:
        return 'BASIC';
    }
  }, []);

  //-- Handle type by index
  const handleTypeByIndex = useCallback((type: string): number => {
    switch (type.toUpperCase()) {
      case 'BASIC':
        return 0;
      case 'INTERMEDIATE':
        return 1;
      case 'ADVANCED':
        return 2;
      default:
        return 0;
    }
  }, []);

  //-- Get the last id of the educational unit based on the type
  const getLastIdByType = useCallback(
    (type: string) => {
      const filtered = fields.filter((field) => field.type.toUpperCase() === type.toUpperCase());
      return filtered[filtered.length - 1]?.id;
    },
    [fields],
  );

  //-- Handle tab changes
  const handleChangeTab = useCallback(
    (_: React.SyntheticEvent<Element, Event> | null, newValue: number) => {
      if (euState.newEuAdded || euState.deletedEu) {
        setEuList([]);
      } else {
        setEuState((prev) => ({ ...prev, activeTab: newValue, selectedEu: 0 }));
      }

      if (newValue !== euState.oldValues) {
        setEuList([]);
        setEuState((prev) => ({ ...prev, oldValues: newValue }));
      }

      fields.forEach((field) => {
        if ((field.type.toUpperCase() as EducationalUnitEnum) === handleIndexChange(newValue)) {
          setEuList((prev) => [...prev, field]);
        }
      });
    },
    [fields, handleIndexChange, euState.newEuAdded, euState.deletedEu, euState.oldValues],
  );

  //-- Add a new educational unit
  const addNewEducationalUnit = (
    type: keyof typeof EducationalUnitEnum,
    index: number,
    isEditMode: boolean = false,
  ): void => {
    if (!isEditMode) {
      handleAddEducationalUnit(type as EducationalUnitEnum, index, isEditMode);
      setEuState((prevState) => ({
        ...prevState,
        activeTab: fields.length - 1,
      }));
    } else {
      handleAddEducationalUnit(type as EducationalUnitEnum, index, isEditMode, t('eu.new_eu'));
      setEuState((prevState) => ({
        ...prevState,
        newEuAdded: true,
        lastDeletedAddedEuType: type,
      }));
    }
  };

  //-- Remove an educational unit
  const handleRemoveSection = useCallback(
    (index: number, type?: string) => {
      handleRemoveEducationalUnit(index);
      if (!isEditMode) {
        setEuState((prevState) => ({
          ...prevState,
          activeTab: Math.max(fields.length - 2, 0),
        }));
      } else {
        setEuState((prevState) => ({
          ...prevState,
          deletedEu: true,
          lastDeletedAddedEuType: type?.toUpperCase() || GLOBAL_VARIABLES.EMPTY_STRING,
        }));
      }
    },
    [handleRemoveEducationalUnit, isEditMode, fields.length],
  );

  //-- Handle changes in the section tabs
  const handleChangeSectionTabs = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setEuState((prevState) => ({
      ...prevState,
      activeEu: newValue,
    }));
  }, []);

  //-- Get index by id
  const getIndexById = useCallback(
    (id: string) => {
      return fields.findIndex((field) => field.id === id);
    },
    [fields],
  );

  //-- Get the count of the educational unit by type
  const getCountByType = useCallback(
    (type: string) => {
      return fields.reduce(
        (count, field) => count + (field.type.toUpperCase() === type.toUpperCase() ? 1 : 0),
        0,
      );
    },
    [fields],
  );

  //-- Handle changes in the section tabs
  const handleChangeEuType = useCallback(
    (type: string) => {
      switch (type) {
        case EducationalUnitEnum.BASIC:
          return t('eu.basic_eu');
        case EducationalUnitEnum.INTERMEDIATE:
          return t('eu.intermediate_eu');
        case EducationalUnitEnum.ADVANCED:
          return t('eu.advanced_eu');
        default:
          return t('eu.basic_eu');
      }
    },
    [t],
  );

  //-- Check if the educational unit can be deleted
  const canDeleteEu = useCallback(
    (type: string) => {
      const count = getCountByType(type);
      return count > 1;
    },
    [getCountByType],
  );

  //______________________ Loader  ______________________
  if (isFetching) {
    return <FallbackLoader />;
  }

  return (
    <FormProvider {...euFormMethods}>
      {!isEditMode ? (
        <>
          <Stack p={2} spacing={3}>
            {fields.map((field, index) => (
              <EUnit
                couseId={courseId}
                field={field}
                euFormMethods={euFormMethods}
                files={files}
                canDelete={canDeleteEu(field.type)}
                key={index}
                euIndex={index}
                loIndex={index}
                isEditMode={isEditMode}
                setFiles={setFiles}
                handleAddQuestion={handleAddQuestion}
                handleRemoveQuestion={handleRemoveQuestion}
                handleAddAnswer={handleAddAnswer}
                handleRemoveAnswer={handleRemoveAnswer}
                handleRemoveEu={() => handleRemoveSection(index)}
                handleAddEuApi={handleAddEU}
                handleAddLearningObject={() => handleAddLearningObject(index)}
                type={handleChangeEuType(field.type)}
                onAddEu={() => addNewEducationalUnit(field.type, index)}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Stack p={2} spacing={3}>
          <MainTabs activeTab={euState.activeTab} handleChange={handleChangeTab} />

          <SectionTabs
            eu={euList}
            activeEu={euState.activeEu}
            handleChange={handleChangeSectionTabs}
            onAddNewEu={addNewEducationalUnit}
            setSelectedEu={(id: number) =>
              setEuState((prevState) => ({ ...prevState, selectedEu: id }))
            }
          />

          {fields[euState.currentId] && euList.length > 0 && (
            <EUnit
              key={fields[euState.currentId].id}
              field={fields[euState.currentId]}
              euFormMethods={euFormMethods}
              files={files}
              canDelete={canDeleteEu(fields[euState.currentId].type)}
              euIndex={euState.currentId}
              loIndex={euState.currentId}
              isEditMode={isEditMode}
              setFiles={setFiles}
              handleAddQuestion={handleAddQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleAddAnswer={handleAddAnswer}
              handleRemoveAnswer={handleRemoveAnswer}
              handleRemoveEu={() =>
                handleRemoveSection(
                  getIndexById(fields[euState.currentId].id),
                  fields[euState.currentId].type,
                )
              }
              handleAddEuApi={handleAddEU}
              handleAddLearningObject={() => handleAddLearningObject(euState.activeEu)}
              type={handleChangeEuType(fields[euState.activeEu].type)}
              onAddEu={() =>
                addNewEducationalUnit(fields[euState.activeEu].type, euState.activeEu, true)
              }
            />
          )}
        </Stack>
      )}
      {/* <DevTool control={euFormMethods.control} /> */}
    </FormProvider>
  );
}

export default EducationalUnitForm;
