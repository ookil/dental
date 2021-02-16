import { GroupingPanel } from '@devexpress/dx-react-scheduler-material-ui';
import styled, { css } from 'styled-components';
import { color } from '../../globalStyles';

const CellRoot = css`
  display: table-cell;
  padding: 16px;
  font-size: 0.875rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

const StyledGroupCell = styled.td<GroupingPanel.CellProps>`
  && {
    ${CellRoot}
    padding: 0;
    box-sizing: border-box;
    padding-top: 4px;
    user-select: none;
    border-right: 1px solid rgba(183, 183, 183, 1);

    ${({ groupOrientation }) =>
      groupOrientation === 'Horizontal' &&
      css`
        border-bottom: none;
        border-top: none;
      `}

    ${({ groupedByDate }) =>
      groupedByDate &&
      css`
        border-right: 1px solid rgb(224, 224, 224);
        border-top: 1px solid rgba(224, 224, 224, 1);
      `} 

    ${({ endOfGroup }) =>
      endOfGroup &&
      css`
        border-right: 1px solid rgba(183, 183, 183, 1);
      `}  

    &:last-child {
      border-right: none;
    }
  }
`;

const Container = styled.div`
  height: 100%;
  /* display: flex;
  align-items: center; */
`;

const Text = styled.div`
  left: 0px;
  width: 100%;
  display: inline-block;
  padding: 8px;
  overflow: hidden;
  position: sticky;
  font-size: 1em;
  box-sizing: border-box;
  font-weight: bold;
  line-height: 1.5;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  letter-spacing: 0.03333em;
  color: rgba(0, 0, 0, 0.54);

  @media (max-width: 900px) {
    font-size: 0.7rem;
  }
`;

export const GroupCell = ({
  group,
  endOfGroup,
  groupOrientation,
  ...restProps
}: GroupingPanel.CellProps) => (
  <StyledGroupCell
    {...restProps}
    group={group}
    endOfGroup={endOfGroup}
    groupOrientation={groupOrientation}
  >
    <Container>
      <Text>{group.text}</Text>
    </Container>
  </StyledGroupCell>
);
