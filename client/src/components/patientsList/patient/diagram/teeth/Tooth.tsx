import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { GET_PATIENT_TEETH } from '../../../../../graphql/queries/teeth';
import {
  GetPatientTeeth,
  GetPatientTeethVariables,
} from '../../../../../graphql/queries/__generated__/GetPatientTeeth';
import { RootState, useAppDispatch } from '../../../../../store/store';
import { crownSurfaceArray, rootSurfaceArray } from './constants';
import { CrownSVG } from './CrownSVG';
import { StyledTooth, ToothNumber, ToothWrapper } from './Teeth.elements';
import ToothRoot from './ToothRoot';
import {
  addDiagramRow,
} from '../../../../../store/slices/diagramSlice';

type ToothProps = {
  toothNumber: number;
  quadrant: number;
  patientId: string;
};

const Tooth = ({ quadrant, toothNumber, patientId }: ToothProps) => {
  const { data } = useQuery<GetPatientTeeth, GetPatientTeethVariables>(
    GET_PATIENT_TEETH,
    {
      variables: {
        patientId,
      },
      fetchPolicy: 'cache-only',
    }
  );
  const teeth = data?.patientTeeth;

  const dispatch = useAppDispatch();

  const selectedAction = useSelector(
    (state: RootState) => state.diagram.currentAction
  );

  const changedTooth = useSelector((state: RootState) => {
    const arr = state.diagram.diagramChart?.filter(
      (tooth) =>
        tooth.quadrant === quadrant && tooth.toothNumber === toothNumber
    );

    if (arr.length > 0) {
      return arr.reduce((acc, curVal) =>
        Object.assign({}, acc, curVal, {
          crown: { ...acc.crown, ...curVal.crown },
        })
      );
    }
  });

  const initialTooth = teeth?.find(
    (tooth) => tooth.quadrant === quadrant && tooth.toothNumber === toothNumber
  );

  let tooth = initialTooth;

  if (changedTooth) {
    tooth = Object.assign({}, initialTooth, changedTooth, {
      crown: { ...initialTooth?.crown, ...changedTooth.crown },
      root: { ...initialTooth?.root, ...changedTooth.root },
    });
  }

  const handleSurfaceSelection = (surfaceId: string) => {
    const toothLocation = {
      id: tooth?.id,
      position: `${quadrant}${toothNumber}`,
      primary: tooth?.primary || false,
      quadrant: quadrant,
      toothNumber: toothNumber,
      actionId: selectedAction?.id,
      diagnostic:
        selectedAction?.type === 'DIAGNOSTIC' ? selectedAction.name : undefined,
      procedure:
        selectedAction?.type === 'PROCEDURE' ? selectedAction.name : undefined,
    };

    if (selectedAction?.crownAction) {
      if (crownSurfaceArray.includes(surfaceId)) {
        const action =
          changedTooth?.crown?.[surfaceId]?.action.id === selectedAction?.id
            ? null
            : { action: selectedAction };
        const changeData = {
          ...toothLocation,
          crown: {
            [surfaceId]: action,
          },
        };

        dispatch(addDiagramRow(changeData));
      }
    }
    if (selectedAction?.rootAction) {
      if (rootSurfaceArray.includes(surfaceId)) {
        const action =
          changedTooth?.root?.[surfaceId]?.action.id === selectedAction?.id
            ? null
            : { action: selectedAction };
        const changeData = {
          ...toothLocation,
          root: {
            [surfaceId]: action,
          },
        };

        dispatch(addDiagramRow(changeData));
      }
    }
  };

  return (
    <ToothWrapper>
      <StyledTooth
        quadrant={quadrant}
        order={quadrant === 1 || quadrant === 2 ? 1 : 2}
      >
        <div style={{ height: '36px', width: '36px' }}>
          <CrownSVG
            crown={tooth?.crown}
            isTarget={selectedAction?.crownAction}
            selectedColor={selectedAction?.fillColor}
            handleSurfaceSelection={handleSurfaceSelection}
          />
        </div>
        <div style={{ height: '36px', width: '36px' }}>
          <ToothRoot
            root={tooth?.root}
            quadrant={quadrant}
            toothNumber={toothNumber}
            isTarget={selectedAction?.rootAction}
            selectedColor={selectedAction?.fillColor}
            handleSurfaceSelection={handleSurfaceSelection}
          />
        </div>
      </StyledTooth>
      <ToothNumber order={quadrant === 1 || quadrant === 2 ? 2 : 1}>
        {toothNumber}
      </ToothNumber>
    </ToothWrapper>
  );
};

export default Tooth;
