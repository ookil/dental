import { GroupingPanel } from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { color } from '../../globalStyles';

const StyledGroupCell = styled.td<GroupingPanel.CellProps>`
  && {
    /* background-color: green; */
    height: 48px;
    display: table-cell;
    padding: 16px;
    font-size: 0.875rem;
    text-align: left;
    font-weight: 400;
    line-height: 1.43;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    border-top: 1px solid rgba(224, 224, 224, 1);
    border-right: 1px solid rgb(224, 224, 224);
    letter-spacing: 0.01071em;
    vertical-align: inherit;
    color: ${color.textPrimary};
    font-family: 'Montserrat', sans-serif;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  left: 81px;
  display: inline-block;
  overflow: hidden;
  position: sticky;
  font-size: 1em;
  box-sizing: border-box;
  font-weight: bold;
  line-height: 1.5;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  letter-spacing: 0.03333em;

  @media (max-width: 900px) {
    font-size: 0.70rem;
  }
`;

export const GroupCell = ({
  group,
  textStyle,
  ...restProps
}: GroupingPanel.CellProps) => (
  <StyledGroupCell
    {...restProps}
    group={group}
    textStyle={{ fontSize: '10px' }}
  >
    <Container>
      <Text>{group.text}</Text>
    </Container>
  </StyledGroupCell>
);
