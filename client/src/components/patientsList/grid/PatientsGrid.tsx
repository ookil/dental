import React, { useState } from 'react';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SearchState,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Cell,
  Header,
  HeaderSelectionCell,
  Root,
  Row,
  SelectionCell,
} from './Grid.elements';
import MoreButton from '../../elements/MoreButton';

const data = [
  {
    id: '1',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: '23/12/2021',
  },
  {
    id: '2',
    name: 'Zbyszek',
    surname: 'Aaaowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: '12 / 03 / 2021',
  },
  {
    id: '3',
    name: 'Zbyszek',
    surname: 'Znweiwalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '4',
    name: 'Zbyszek',
    surname: 'Malkwalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '5',
    name: 'Zbyszek',
    surname: 'Wifdkalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '6',
    name: 'Zbyszek',
    surname: 'Zaifdlski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '7',
    name: 'Zbyszek',
    surname: 'Gudski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '8',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '9',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '10',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '11',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '12',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '13',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '14',
    name: 'Zbyszek',
    surname: 'Kowalski',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '15',
    name: 'Zbyszek',
    surname: 'Akjfg',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '16',
    name: 'Zbyszek',
    surname: 'Hjdsu',
    number: '435 654 356',
    nextApt: '1',
    lastApt: 'Mon 23',
  },
  {
    id: '17',
    name: 'Zbyszek',
    surname: 'Ziaj',
    number: '435 654 356',
    nextApt: '1',
    lastApt: '23/12/2021',
  },
];

type ColumnExtensionsType = {
  columnName: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
};

const tableColumnExtensions: ColumnExtensionsType[] = [
  { columnName: 'lastApt', width: '160px', align: 'center' },
  { columnName: 'id', width: '60px', align: 'center' },
];

type Props = {
  searchQuery: string;
};

const PatientsGrid = ({ searchQuery }: Props) => {
  const [columns] = useState([
    { name: 'surname', title: 'Last Name' },
    { name: 'name', title: 'First Name' },
    { name: 'number', title: 'Phone Number' },
    { name: 'bday', title: 'Birth Date' },
    { name: 'lastApt', title: 'Recent visit' },
    { name: 'id', title: ' ', getCellValue: () => <MoreButton /> },
  ]);
  const [rows] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState<(string | number)[] | undefined>(
    []
  );

  return (
    <Root>
      <Grid columns={columns} rows={rows}>
        <SortingState
          defaultSorting={[{ columnName: 'surname', direction: 'asc' }]}
        />
        <IntegratedSorting />

        <SearchState value={searchQuery} />
        <IntegratedFiltering />

        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={20}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />

        <IntegratedPaging />
        <IntegratedSelection />

        <Table
          headComponent={Header}
          cellComponent={Cell}
          rowComponent={Row}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        <TableSelection
          headerCellComponent={HeaderSelectionCell}
          cellComponent={SelectionCell}
          showSelectAll
        />

        <PagingPanel />
      </Grid>
    </Root>
  );
};

export default PatientsGrid;
