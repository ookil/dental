import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetDiagramCategories_diagramCategories_procedures_actions } from '../../graphql/queries/__generated__/GetDiagramCategories';
import {
  GetPatientTeeth_patientTeeth,
  GetPatientTeeth_patientTeeth_crown,
  GetPatientTeeth_patientTeeth_crown_buccal,
  GetPatientTeeth_patientTeeth_crown_distal,
  GetPatientTeeth_patientTeeth_crown_lingual,
  GetPatientTeeth_patientTeeth_crown_mesial,
  GetPatientTeeth_patientTeeth_crown_occlusial,
  GetPatientTeeth_patientTeeth_root,
  GetPatientTeeth_patientTeeth_root_rootOne,
  GetPatientTeeth_patientTeeth_root_rootThree,
  GetPatientTeeth_patientTeeth_root_rootTwo,
} from '../../graphql/queries/__generated__/GetPatientTeeth';

interface ChangedTeeth extends GetPatientTeeth_patientTeeth {
  crown: {
    [key: string]:
      | GetPatientTeeth_patientTeeth_crown_buccal
      | GetPatientTeeth_patientTeeth_crown_distal
      | GetPatientTeeth_patientTeeth_crown_lingual
      | GetPatientTeeth_patientTeeth_crown_occlusial
      | GetPatientTeeth_patientTeeth_crown_mesial
      | null;
  } & GetPatientTeeth_patientTeeth_crown;
  root: {
    [key: string]:
      | GetPatientTeeth_patientTeeth_root_rootOne
      | GetPatientTeeth_patientTeeth_root_rootTwo
      | GetPatientTeeth_patientTeeth_root_rootThree
      | null;
  } & GetPatientTeeth_patientTeeth_root;
}

interface IDiagramRow extends ChangedTeeth {
  actionId: string;
  diagnostic: string | undefined;
  procedure: string | undefined;
}

type DiagramState = {
  currentAction: GetDiagramCategories_diagramCategories_procedures_actions | null;
  diagramChart: IDiagramRow[];
};

const initialState: DiagramState = {
  currentAction: null,
  diagramChart: [],
};

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    setCurrentAction: (
      state,
      action: PayloadAction<GetDiagramCategories_diagramCategories_procedures_actions>
    ) => {
      state.currentAction = action.payload;
    },
    deleteSelection: (state, action: PayloadAction<(string | number)[]>) => {
      const selectionArr = action.payload.sort().map(Number);
      const rows = state.diagramChart.reverse();

      for (let i = selectionArr.length - 1; i >= 0; i--) {
        rows.splice(selectionArr[i], 1);
      }

      state.diagramChart = [...rows.reverse()];
    },
    discardDiagram: (state) => {
      state.diagramChart = [];
    },
    updateRow: (state, action) => {
      const newData = action.payload;
      const index = parseInt(Object.keys(newData)[0]);
      const oldArr = state.diagramChart.reverse();

      const prevRow = oldArr[index];

      const updatedRow = Object.assign(prevRow, newData[index]);

      oldArr[index] = updatedRow;
      state.diagramChart = oldArr.reverse();
    },
    addDiagramRow: (state, action) => {
      const payloadTooth = action.payload;

      const toothPrev = state.diagramChart.find(
        (tooth) =>
          tooth.quadrant === payloadTooth.quadrant &&
          tooth.toothNumber === payloadTooth.toothNumber &&
          tooth.actionId === payloadTooth.actionId
      );

      // new tooth, add to array
      if (toothPrev === undefined) {
        state.diagramChart.push(payloadTooth);
      } else {
        if (toothPrev.actionId === payloadTooth.actionId) {
          const toothIndexToReplace = state.diagramChart.findIndex(
            (tooth) =>
              tooth.quadrant === payloadTooth.quadrant &&
              tooth.toothNumber === payloadTooth.toothNumber &&
              tooth.actionId === payloadTooth.actionId
          );

          let updatedTooth: IDiagramRow | undefined;
          // tooth exist in arr, update it info
          if (payloadTooth.crown) {
            updatedTooth = Object.assign({}, toothPrev, {
              crown: { ...toothPrev.crown, ...payloadTooth.crown },
            });

            Object.keys(updatedTooth.crown).forEach(
              (k) =>
                updatedTooth?.crown[k] == null && delete updatedTooth?.crown[k]
            );

            if (
              Object.values(updatedTooth.crown).every((val) => val === null)
            ) {
              state.diagramChart.splice(toothIndexToReplace, 1);
              updatedTooth = undefined;
            }
          }
          if (payloadTooth.root) {
            updatedTooth = Object.assign({}, toothPrev, {
              root: { ...toothPrev.root, ...payloadTooth.root },
            });

            Object.keys(updatedTooth.root).forEach(
              (k) =>
                updatedTooth?.root[k] == null && delete updatedTooth?.root[k]
            );

            if (Object.values(updatedTooth.root).every((val) => val === null)) {
              state.diagramChart.splice(toothIndexToReplace, 1);
              updatedTooth = undefined;
            }
          }
          if (updatedTooth) {
            const chartCopy = state.diagramChart.slice();

            chartCopy[toothIndexToReplace] = updatedTooth;

            state.diagramChart = [...chartCopy];
          }
        } else {
          state.diagramChart.push(payloadTooth);
        }
      }
    },
  },
});

export const {
  setCurrentAction,
  addDiagramRow,
  discardDiagram,
  deleteSelection,
  updateRow,
} = diagramSlice.actions;

export default diagramSlice.reducer;
