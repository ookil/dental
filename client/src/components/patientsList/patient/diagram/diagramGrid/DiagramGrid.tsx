import React, { useState } from 'react';

import {
  Grid,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
  TableSelection,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import {
  EditingState,
  IntegratedSelection,
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Command,
  DiagramRoot,
  DiagramSelectionCell,
  ToothCellContent,
  WrappedCell,
} from './DiagramGrid.elements';
import { Header, HeaderSelectionCell } from '../../../grid/Grid.elements';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../store/store';
import { updateRow } from '../../../../../store/slices/diagramSlice';
import { Getter } from '@devexpress/dx-react-core';
import { userInfoVar } from '../../../../../cache';
import { format } from 'date-fns';

const tableColumn: VirtualTable.ColumnExtension[] = [
  { columnName: 'date', width: '210px' },
  { columnName: 'tooth', width: '150px' },
  { columnName: 'diagnostic', wordWrapEnabled: true },
  { columnName: 'procedure', wordWrapEnabled: true },
  { columnName: 'description', wordWrapEnabled: true },
  { columnName: 'doctor', width: '200px', align: 'center' },
];

const editingStateColumnExtensions = [
  { columnName: 'date', editingEnabled: false },
  { columnName: 'tooth', editingEnabled: false },
  { columnName: 'doctor', editingEnabled: false },
];

type DiagramProps = {
  selectedAppointment: any;
  selection: (string | number)[];
  setSelection: React.Dispatch<React.SetStateAction<(string | number)[]>>;
};

const DiagramGrid = ({
  selection,
  setSelection,
  selectedAppointment,
}: DiagramProps) => {
  const user = userInfoVar();

  const [columns] = useState([
    {
      name: 'date',
      title: 'Date',
      getCellValue: () => format(selectedAppointment.startAt, 'd MMM 	yyyy'),
    },
    {
      name: 'tooth',
      title: 'Tooth',
      getCellValue: (row: any) => <ToothCellContent row={row} />,
    },
    { name: 'diagnostic', title: 'Diagnostic' },
    { name: 'procedure', title: 'Procedure' },
    { name: 'description', title: 'Description' },
    {
      name: 'doctor',
      title: 'Doctor',
      getCellValue: () =>
        user && user.profile?.name + ' ' + user.profile?.surname,
    },
  ]);

  const [tableColumnExtensions] = useState(tableColumn);

  const reduxRows = useSelector(
    (state: RootState) => state.diagram.diagramChart
  );

  const rows = reduxRows.slice().reverse();

  const dispatch = useAppDispatch();

  const commitChanges = ({ changed }: any) => {
    if (changed) {
      console.log(changed);
      if (Object.keys(changed)[0]) {
        dispatch(updateRow(changed));
      }
    }
  };

  return (
    <DiagramRoot>
      <Grid rows={rows} columns={columns}>
        <EditingState
          columnExtensions={editingStateColumnExtensions}
          onCommitChanges={commitChanges}
        />

        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <IntegratedSelection />

        <VirtualTable
          headComponent={Header}
          columnExtensions={tableColumnExtensions}
        />

        <TableHeaderRow />
        <TableSelection
          headerCellComponent={HeaderSelectionCell}
          cellComponent={DiagramSelectionCell}
          showSelectAll
        />
        <TableEditRow cellComponent={WrappedCell} />
        <TableEditColumn commandComponent={Command} showEditCommand />

        <Getter
          name='tableColumns'
          computed={({ tableColumns }) => {
            const result = [
              ...tableColumns.filter(
                (c: { type: symbol }) => c.type !== TableEditColumn.COLUMN_TYPE
              ),
              {
                key: 'editCommand',
                type: TableEditColumn.COLUMN_TYPE,
                width: 140,
              },
            ];
            return result;
          }}
        />
      </Grid>
    </DiagramRoot>
  );
};

export default DiagramGrid;
