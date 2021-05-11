import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableEditColumn,
  TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { color } from '../../../../../globalStyles';
import { SelectionCell } from '../../../grid/Grid.elements';
import { CrownSVG } from '../teeth/CrownSVG';
import ToothRoot from '../teeth/ToothRoot';

export const DiagramRoot = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 4px 1px rgb(0 0 0 / 10%);
  padding-bottom: 3px;

  div[class*='RootBase-root'] {
    height: 100%;
  }
`;

export const FocusableCell = ({ onClick, value, ...restProps }: any) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick}>
    <div>{value}</div>
  </Table.Cell>
);

const StyledTextArea = styled.textarea<{ cloneHeight: number }>`
  border: none;
  outline: none;
  width: 100%;
  min-height: 20px;
  resize: vertical;
  font-size: 0.875rem;
  padding: 5px;
  height: ${({ cloneHeight }) => cloneHeight && cloneHeight + 'px'};
`;

const ActiveOutline = styled.div<{isActive:boolean}>`
  border-bottom: ${({isActive}) => isActive ? '' : ''}  1px solid ${color.bgSecondary};

  &:hover {
    border-bottom: 1px solid ${color.bluePrimary};
  }
`;

export const WrappedCell = ({
  value,
  editingEnabled,
  onValueChange,
  ...restProps
}: TableEditRow.CellProps) => {
  const hiddenRef = useRef<HTMLTextAreaElement>(null);

  const [cloneHeight, setCloneHeight] = useState(20);
  const [text, setText] = useState(value);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (hiddenRef.current) {
      setCloneHeight(hiddenRef.current.scrollHeight);
    }
  }, [hiddenRef]);

  const handleChange = (newValue: string) => {
    setText(newValue);
    onValueChange(newValue);
  };

  if (editingEnabled) {
    return (
      <Table.Cell {...restProps} value={value}>
        <ActiveOutline isActive={isActive} onClick={() => setActive(true)}>
          <StyledTextArea
            ref={hiddenRef}
            cloneHeight={cloneHeight}
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={text}
          />
        </ActiveOutline>
      </Table.Cell>
    );
  }

  return <Table.Cell {...restProps} value={value} />;
};

const ContentWrapper = styled.div`
  font-size: inherit;
  display: flex;
  align-items: center;
`;

const ToothPosition = styled.p`
  font-size: inherit;
  margin-right: 5px;
  width: 20px;
`;

const ToothSurface = styled.div<{ quadrant: number }>`
  width: 30px;
  height: 30px;

  transform: ${({ quadrant }) => {
    if (quadrant === 1) {
      return css`scale(1, -1) `;
    }
    if (quadrant === 2) {
      return css`scale(-1, -1) `;
    }
    if (quadrant === 3) {
      return css`scale(-1, 1) `;
    }
  }};
`;

export const ToothCellContent = ({ row }: any) => {
  let surface;

  if (row.crown) {
    surface = (
      <CrownSVG crown={row.crown} handleSurfaceSelection={() => null} />
    );
  }
  if (row.root) {
    surface = (
      <ToothRoot
        root={row.root}
        quadrant={row.quadrant}
        toothNumber={row.toothNumber}
        handleSurfaceSelection={() => null}
      />
    );
  }

  return (
    <ContentWrapper>
      <ToothPosition>{row.quadrant + '.' + row.toothNumber}</ToothPosition>
      <ToothSurface quadrant={row.quadrant}>{surface}</ToothSurface>
    </ContentWrapper>
  );
};

export const DiagramSelectionCell = styled(SelectionCell)`
  && {
    border-right: none;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

///////////////////////////////////////
////            EDIT COLUMN        ////
///////////////////////////////////////

type ButtonProps = {
  onExecute: () => void;
};

const EditButton = ({ onExecute }: ButtonProps) => (
  <IconButton onClick={onExecute} title='Edit row'>
    <EditIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }: ButtonProps) => (
  <IconButton onClick={onExecute} title='Save changes'>
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }: ButtonProps) => (
  <IconButton color='secondary' onClick={onExecute} title='Cancel changes'>
    <CancelIcon />
  </IconButton>
);

const Empty = () => <div></div>;

const commandComponents = {
  edit: EditButton,
  commit: CommitButton,
  cancel: CancelButton,
  delete: Empty,
  add: Empty,
};

export const Command = ({ id, onExecute }: TableEditColumn.CommandProps) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};
