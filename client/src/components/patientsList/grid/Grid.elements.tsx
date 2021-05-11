import { Table, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../../globalStyles';
import {
  openModal,
  patientForAppointment,
} from '../../../store/slices/modalsSlice';
import { useAppDispatch } from '../../../store/store';
import { GifWrapper } from '../../elements/Elements';

const { bluePrimary, blueHover } = color;

export const Root = styled.div<{ searchOnly: boolean }>`
  height: ${({ searchOnly }) => (searchOnly ? '100%' : 'calc(100% - 55px)')};
  width: 100%;
  position: relative;

  div[class*='RootBase-root'] {
    height: 100%;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

/////////////////////////////////////////////////////////////////////////
//////                            HEADER                           //////
/////////////////////////////////////////////////////////////////////////

const StyledHeader = styled(Table.TableHead)`
  && {
    th {
      padding-top: 4px;
      padding-bottom: 4px;
      background: #ecf1f7;
      position: sticky;
      top: 0;
      border-bottom: 1px solid ${bluePrimary};
      font-weight: 550;
      z-index: 2;

      span[class*='Title-title-'] {
        font-size: 13.5px;
      }
    }
  }
`;

export const Header = (props: any) => <StyledHeader {...props} />;

/////////////////////////////////////////////////////////////////////////
//////                            ROW                              //////
/////////////////////////////////////////////////////////////////////////

const StyledRow = styled(Table.Row)`
  && {
    &:hover {
      background-color: ${blueHover};
    }

    &:nth-of-type(even) {
      background-color: #f7f7f7;

      &:hover {
        background-color: ${blueHover};
      }
    }
  }
`;

export const Row = (props: Table.DataRowProps) => {
  return <StyledRow {...props} />;
};

/////////////////////////////////////////////////////////////////////////
//////                            CELL                             //////
/////////////////////////////////////////////////////////////////////////

const StyledCell = styled(Table.Cell)`
  && {
    font-family: 'Montserrat';
    font-weight: 450;
    font-size: 0.82rem;
    cursor: pointer;
    border-bottom: none;
    border-right: 1px solid rgba(224, 224, 224, 1);

    &:last-of-type {
      border-right: none;
    }
  }
`;

const VisitCell = styled(StyledCell)`
  &:hover {
    background-color: rgba(239, 245, 255, 0.9);
  }
`;

interface ICell extends Table.DataCellProps {
  selectingPatientForAppointment: boolean;
}

export const Cell = (props: ICell) => {
  const { column, row, selectingPatientForAppointment, ...restProps } = props;
  const dispatch = useAppDispatch();

  const history = useHistory();
  if (column.name === 'appointments' && row.appointments.length > 0) {
    return (
      <VisitCell
        {...restProps}
        column={column}
        row={row}
        onClick={() => alert('vist')}
      />
    );
  }

  return (
    <StyledCell
      {...restProps}
      column={column}
      row={row}
      onClick={() => {
        if (selectingPatientForAppointment) {
          dispatch(patientForAppointment(row.id));
        } else {
          history.push(`/patient/${row.id}`);
          dispatch(openModal(false));
        }
      }}
    />
  );
};

/////////////////////////////////////////////////////////////////////////
//////                      SELECTION CELL                         //////
/////////////////////////////////////////////////////////////////////////

const StyledSelection = styled(TableSelection.Cell)`
  && {
    border-bottom: none;
    border-right: 1px solid rgba(224, 224, 224, 1);

    span {
      color: ${({ selected }) => selected && bluePrimary};
    }
  }
`;

const StyledHeaderCell = styled(TableSelection.HeaderCell)`
  && {
    span {
      color: ${({ allSelected }) => allSelected && bluePrimary};
    }
  }
`;

export const SelectionCell = (props: TableSelection.CellProps) => (
  <StyledSelection {...props} />
);

export const HeaderSelectionCell = (props: TableSelection.HeaderCellProps) => (
  <StyledHeaderCell {...props} />
);

export const LoadingWrapper = styled(GifWrapper)`
  position: absolute;
  top: 0;
  background: rgb(171 171 171 / 31%);
`;
