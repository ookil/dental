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
  GetOffsetPatients,
  GetOffsetPatientsVariables,
} from '../../../graphql/queries/__generated__/GetOffsetPatients';
import { format } from 'date-fns';
import { Gif } from '../../elements/Elements';
import loadingGif from '../../../images/loading.gif';
import { useQuery } from '@apollo/client';
import { GET_OFFSET_PATIENTS } from '../../../graphql/queries/patient';
import { clinicIdVar } from '../../../cache';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

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

const getColumns = (searchOnly: boolean) => {
  if (searchOnly) {
    return [
      { name: 'surname', title: 'Last Name' },
      { name: 'name', title: 'First Name' },
      { name: 'mobile', title: 'Phone Number' },
      { name: 'bday', title: 'Birth Date' },
    ];
  } else {
    return [
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
    ];
  }
};

type Props = {
  searchOnly?: boolean;
  searchQuery: string;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  paging: {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  };
};

const PatientsGrid = ({
  searchOnly = false,
  searchQuery,
  totalCount,
  setTotalCount,
  paging: { currentPage, setCurrentPage },
}: Props) => {
  const [columns] = useState(getColumns(searchOnly));

  const [selection, setSelection] = useState<(string | number)[] | undefined>(
    []
  );

  const [pageSize] = useState(20);

  const [sorting, setSorting] = useState<
    { columnName: string; direction: 'asc' | 'desc' }[]
  >([{ columnName: 'surname', direction: 'asc' }]);

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
        search: searchQuery,
        orderBy: { [sorting[0].columnName]: sorting[0].direction },
      },
    },
    onCompleted(data) {
      setTotalCount(data.getOffsetPatients.totalCount);
    },
  });

  let rows: any[] = [];
  if (searchOnly) {
    if (searchQuery === '') {
      rows = [];
    } else {
      rows = data?.getOffsetPatients.patients || [];
    }
  } else {
    rows = data?.getOffsetPatients.patients || [];
  }

  const selectingPatientForAppointment = useSelector(
    (state: RootState) => state.modal.selectingPatientForAppointment
  );

  return (
    <Root searchOnly={searchOnly}>
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
          cellComponent={(props) => (
            <Cell
              {...props}
              selectingPatientForAppointment={selectingPatientForAppointment}
            />
          )}
          rowComponent={Row}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        {!searchOnly && (
          <TableSelection
            headerCellComponent={HeaderSelectionCell}
            cellComponent={SelectionCell}
            showSelectAll
          />
        )}

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
