import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { size, color } from '../../globalStyles';
import { Button } from '../elements/Elements';

const { bluePrimary, textSecondary } = color;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const Text = styled.p``;

export const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(141 141 151 / 30%);
`;

export const Separator = styled.div<{ hide?: boolean }>`
  margin: 0 20px;
  height: 50%;
  width: 1px;
  background-color: rgb(141 141 151 / 30%);

  ${({ hide }) =>
    hide &&
    css`
      @media (max-width: ${size.mobileL}) {
        display: none;
      }
    `}
`;

export const TitlePatient = styled(Link)`
  font-size: 1.2rem;
  color: ${bluePrimary};
  margin-right: 10px;
  font-weight: bold;
  text-decoration: none;
`;

export const PatientContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  height: 100%;
  padding: 20px 25px;
  position: relative;

  @media (max-width: ${size.mobileL}) {
    flex-wrap: wrap;
    padding: 20px 15px 10px 15px;
  }
`;

export const Col = styled.div<{ col?: string }>`
  flex-basis: 50%;
  margin-left: ${({ col }) => (col === 'second' ? '20px' : 0)};

  @media (max-width: ${size.mobileL}) {
    flex-basis: 100%;

    &:nth-child(2) {
      margin-left: 0;
      margin-top: 20px;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const BookmarkButton = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  border: none;
  color: ${({ isActive }) => (isActive ? bluePrimary : textSecondary)};
  font-size: 0.9em;
  font-weight: 500;
  border-radius: 3px;
  padding: 0.39em 1em;
  background-color: #ebecf0;
  box-shadow: 0 1px 4.8px 0px #777777;
  outline: none;

  &:nth-of-type(even) {
    margin: 0 10px;
  }
`;

export const TabWrapper = styled.div`
  width: 100%;
  height: calc(100% - 55px);
`;

export const MutationButtons = styled.div`
  position: sticky;
  z-index: 5;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

export const DeletePatientButton = styled(Button)`
  font-size: 0.9em;
  margin-top: 20px;
`;
