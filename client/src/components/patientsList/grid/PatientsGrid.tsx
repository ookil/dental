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
import { useQuery } from '@apollo/client';
import { GET_OFFSET_PATIENTS } from '../../../graphql/queries/patient';
import {
  GetOffsetPatients,
  GetOffsetPatientsVariables,
} from '../../../graphql/queries/__generated__/GetOffsetPatients';
import { clinicIdVar } from '../../../cache';
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
};

const PatientsGrid = ({ searchQuery, totalCount }: Props) => {
  const [columns] = useState([
    { name: 'surname', title: 'Last Name' },
    { name: 'name', title: 'First Name' },
    { name: 'mobile', title: 'Phone Number' },
    { name: 'bday', title: 'Birth Date' },
    {
      name: 'appointments',
      title: 'Recent visit',
      getCellValue: (row: any) =>
        format(row.appointments[0].endAt, 'dd/MM/yyyy'),
    },
    { name: 'id', title: ' ', getCellValue: () => <MoreButton /> },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(20);

  const [sorting, setSorting] = useState<
    { columnName: string; direction: 'asc' | 'desc' }[]
  >([{ columnName: 'surname', direction: 'asc' }]);

  const [selection, setSelection] = useState<(string | number)[] | undefined>(
    []
  );

  const clinicId = clinicIdVar();

  const { data, loading } = useQuery<
    GetOffsetPatients,
    GetOffsetPatientsVariables
  >(GET_OFFSET_PATIENTS, {
    variables: {
      patientsVar: {
        clinicId,
        currentPage,
        pageSize,
        orderBy: { [sorting[0].columnName]: sorting[0].direction },
      },
    },
  });

  const rows = data?.getOffsetPatients || [];

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
