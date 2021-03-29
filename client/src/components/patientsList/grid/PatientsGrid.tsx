import React, { useState } from 'react';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import {
  CustomPaging,
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
  LoadingWrapper,
  Root,
  Row,
  SelectionCell,
} from './Grid.elements';
import MoreButton from '../../elements/MoreButton';
import {
  GetOffsetPatients_getOffsetPatients_patients,
} from '../../../graphql/queries/__generated__/GetOffsetPatients';
import { format } from 'date-fns';
import { Gif } from '../../elements/Elements';
import loadingGif from '../../../images/loading.gif';

type ColumnExtensionsType = {
  columnName: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
};

const tableColumnExtensions: ColumnExtensionsType[] = [
  { columnName: 'appointments', width: '160px', align: 'center' },
  { columnName: 'id', width: '60px', align: 'center' },
];

const sortingColumns = [
  { columnName: 'name', sortingEnabled: true },
  { columnName: 'surname', sortingEnabled: true },
  { columnName: 'bday', sortingEnabled: true },
  { columnName: 'appointments', sortingEnabled: true },
];

type Props = {
  searchQuery: string;
  totalCount: number;
  paging: {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  };
  pageSize: number;
  sort: {
    sorting: {
      columnName: string;
      direction: 'asc' | 'desc';
    }[];
    setSorting: React.Dispatch<
      React.SetStateAction<
        {
          columnName: string;
          direction: 'asc' | 'desc';
        }[]
      >
    >;
  };
  rows: GetOffsetPatients_getOffsetPatients_patients[];
  loading: boolean;
};

const PatientsGrid = ({
  searchQuery,
  totalCount,
  pageSize,
  rows,
  paging: { currentPage, setCurrentPage },
  sort: { setSorting, sorting },
  loading,
}: Props) => {
  const [columns] = useState([
    { name: 'surname', title: 'Last Name' },
    { name: 'name', title: 'First Name' },
    { name: 'mobile', title: 'Phone Number' },
    { name: 'bday', title: 'Birth Date' },
    {
      name: 'appointments',
      title: 'Recent visit',
      getCellValue: (row: any) =>
        row.appointments[0]
          ? format(row.appointments[0].endAt, 'dd/MM/yyyy')
          : null,
    },
    { name: 'id', title: ' ', getCellValue: () => <MoreButton /> },
  ]);

  const [selection, setSelection] = useState<(string | number)[] | undefined>(
    []
  );

  return (
    <Root>
      <Grid columns={columns} rows={rows}>
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          columnSortingEnabled={false}
          columnExtensions={sortingColumns}
        />
        <IntegratedSorting />

        <SearchState value={searchQuery} />

        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />

        <CustomPaging totalCount={totalCount} />
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
      {loading && (
        <LoadingWrapper>
          <Gif src={loadingGif} />
        </LoadingWrapper>
      )}
    </Root>
  );
};

export default PatientsGrid;
