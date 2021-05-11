import React from 'react';
import styled, { css } from 'styled-components';
import { GetPatientTeeth_patientTeeth_root } from '../../../../../graphql/queries/__generated__/GetPatientTeeth';
import { SVG } from './CrownSVG';

export const PathFill = styled.path<{
  selectedColor?: string;
  isTarget?: boolean;
}>`
  ${({ selectedColor, isTarget }) => {
    if (isTarget) {
      return css`
        &:hover {
          cursor: pointer;
          fill: ${selectedColor && selectedColor}
          };
        }
      `;
    }
  }}
`;

type RootProps = {
  root: GetPatientTeeth_patientTeeth_root | null | undefined;
  isTarget?: boolean;
  selectedColor?: string;
  handleSurfaceSelection: (surfaceId: string) => void;
};

export const RootOneSVG = ({
  root,
  isTarget,
  selectedColor,
  handleSurfaceSelection,
}: RootProps) => (
  <SVG
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='Group 89'>
      <PathFill
        id='rootOne'
        d='M7 0.996338H30C30 0.996338 27 13.9962 25 17.9962C23 21.9962 20.8059 35.1305 18.5 35.3423C16.1174 35.1178 11.5 20.9962 9.5 16.4962C7.5 11.9962 7 0.996338 7 0.996338Z'
        fill={root?.rootOne?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <path
        id='Vector 15'
        d='M29.7999 0.996338H7.12819C6.62438 0.996338 7.63201 12.0051 9.68619 16.7914C11.7404 21.5778 16.2505 34.4107 18.2119 34.98C20.1733 35.5493 23.7541 21.0995 25.7693 15.8343C27.7846 10.5691 30.8075 0.996338 29.7999 0.996338Z'
        stroke='#333333'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </SVG>
);

export const RootTwoSVG = ({
  root,
  isTarget,
  selectedColor,
  handleSurfaceSelection,
}: RootProps) => (
  <SVG
    width='36'
    height='37'
    viewBox='0 0 36 37'
    fill='none'
    xmlns='http://www.w3.org/2000/SVG'
  >
    <PathFill
      id='rootTwo'
      d='M19.4999 1.51749C23.4999 0.538539 28.4999 1.24903 31.0001 1.24903C33.5003 1.24903 26.3052 33.0005 23.0001 36.2704C21 33.5 21.5 31.8632 21 25.5C20.5 19.1368 16.2989 2.30092 19.4999 1.51749Z'
      fill={root?.rootTwo?.action.fillColor || 'white'}
      selectedColor={selectedColor}
      isTarget={isTarget}
      onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
    />
    <PathFill
      id='rootOne'
      d='M4.713 1.24556C7.25496 1.9682 17 0.266599 18.9999 1.51749C20.9999 2.76838 8.66751 33.9844 7.99991 35.2915C7.33232 36.5986 6.5 35.2915 6.5 35.2915C5.5001 26.7915 2.17103 0.522911 4.713 1.24556Z'
      fill={root?.rootOne?.action.fillColor || 'white'}
      selectedColor={selectedColor}
      isTarget={isTarget}
      onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
    />
    <path
      id='Vector 18'
      d='M31.0007 1.33081C28.0001 1.33092 21.217 1.33063 19.2171 1.33081C18.6988 1.33086 17.5001 7.46245 18.5001 11.8568C19.5002 16.2511 20.2172 18.2042 21 23.5751C21.7828 28.946 21 38.7113 23.5007 35.5107C26.0015 32.31 29 17.2277 30.3698 11.8568C31.7395 6.48588 32.2418 1.33076 31.0007 1.33081Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      id='Vector 19'
      d='M19.0002 1.33665C17.5 1.33664 7.76814 1.38774 5.00016 1.33665C3.7795 1.31412 2.99998 8.93138 4.19488 12.8369C5.38978 16.7424 5 33.3408 6.5 35.7817C8 38.2226 10.5 27.4825 13.5 21.6242C16.5 15.766 19.7444 1.33665 19.0002 1.33665Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </SVG>
);

export const RootThreeSVG = ({
  root,
  isTarget,
  selectedColor,
  handleSurfaceSelection,
}: RootProps) => (
  <SVG
    width='36'
    height='37'
    viewBox='0 0 36 37'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <PathFill
      id='rootThree'
      d='M22.5 9.16394L11 10.1577C11 10.1577 13 14.9069 14 21.3666C15 27.8262 17.4673 35.7766 18 35.7766C19 35.7766 21.5 22.3604 22.5 20.8697C23.5 19.379 22.5 9.16394 22.5 9.16394Z'
      fill={root?.rootThree?.action.fillColor || 'white'}
      selectedColor={selectedColor}
      isTarget={isTarget}
      onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
    />
    <path
      id='canal-3'
      d='M22.5002 9.16394L11.0002 10.1577C11.0002 10.1577 13.5 17.8883 14 22.0833C14.5 26.2783 17 33.5093 18 35C19 36.4907 20.0005 27.5491 22 22.0833C23.9995 16.6174 22.5002 9.16394 22.5002 9.16394Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <PathFill
      id='rootTwo'
      d='M19.1394 1C20.1279 1 30.0171 1.5 31.5 1.5C32.9829 1.5 30.4541 31.6245 26.5 36C26.1635 32.6904 25.5647 29.4759 24.0819 24.3321C22.5991 19.1883 19.435 15.6764 18.6451 14.1227C17.1621 11.2057 18.6308 1 19.1394 1Z'
      fill={root?.rootTwo?.action.fillColor || 'white'}
      selectedColor={selectedColor}
      isTarget={isTarget}
      onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
    />
    <PathFill
      id='rootOne'
      d='M4.82509 1.2152C6.02528 0.730984 18.9596 1.21525 18.9596 1.21525C18.9596 1.21525 19.4542 5.57211 16.9809 13.3196C11.5395 21.5513 9.06622 33.1725 8.07689 35.5945C7.08756 38.0164 4.61423 29.2996 4.11956 17.1942C3.6249 5.08874 4.82509 1.2152 4.82509 1.2152Z'
      fill={root?.rootOne?.action.fillColor || 'white'}
      selectedColor={selectedColor}
      isTarget={isTarget}
      onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
    />
    <path
      id='canal-2'
      d='M31.1766 1.48727C28.5946 0.999985 18.7825 0.999981 18.7825 0.999981C18.7825 0.999981 16.7164 12.695 19.2988 15.1314C21.8812 17.5679 24.7155 22.4328 25.7682 27.6653C26.8011 32.799 25.7683 37.8984 27.8339 34C29.8995 30.1016 33.7587 1.97456 31.1766 1.48727Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      id='canal-1'
      d='M18.9155 0.999977H4.98524C2.99525 0.999977 4.28883 27.6156 6.47802 33C8.66722 38.3845 8.46733 32.5105 9.46284 30.063C10.9123 23.5028 13.4427 19.6015 16.4277 14.7065C18.0574 12.034 19.3482 0.999989 18.9155 0.999977Z'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </SVG>
);

export const ToothNumber = styled.p<{ order: number }>`
  font-size: 0.8em;
  align-self: center;
  order: ${({ order }) => order && order};
`;

export const StyledTooth = styled.div<{ quadrant: number; order: number }>`
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;
  order: ${({ order }) => order && order};

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

export const ToothQuadrantBox = styled.div<{ quadrant: number }>`
  display: flex;
  ${({ quadrant }) => {
    if (quadrant === 1) {
      return `
            justify-self: end;
            align-self: end;
          `;
    }

    if (quadrant === 2) {
      return `
            align-self: end;
          `;
    }

    if (quadrant === 4) {
      return `
            justify-self: end;
        `;
    }
  }}
`;

export const ToothWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: space-between;
  padding: 0 12px;
`;
