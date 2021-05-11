import React from 'react';
import styled from 'styled-components';
import { GetPatientTeeth_patientTeeth_crown } from '../../../../../graphql/queries/__generated__/GetPatientTeeth';
import { PathFill } from './Teeth.elements';

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

type CrownSVGProps = {
  crown: GetPatientTeeth_patientTeeth_crown | null | undefined;
  handleSurfaceSelection: (surfaceId: string) => void;
  selectedColor?: string;
  isTarget?: boolean;
};

export const CrownSVG = ({
  crown,
  selectedColor,
  isTarget,
  handleSurfaceSelection,
}: CrownSVGProps) => {
  return (
    <SVG
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <PathFill
        id='buccal'
        d='M25 25H11L1 35.5652C1 35.5652 1.50002 36 2.00002 36H2.50002H3.00002H33H34C34.5 36 35 35.5652 35 35.5652L25 25Z'
        fill={crown?.buccal?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <PathFill
        id='lingual'
        d='M11 10.5L25 10.5L35 0.434783C35 0.434783 34.5 0 34 0L33.5 0L33 0L3 0L2 0C1.5 0 1 0.434783 1 0.434783L11 10.5Z'
        fill={crown?.lingual?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <PathFill
        id='distal'
        d='M10.5 11V25L0.434783 35C0.434783 35 0 34.5 0 34V33.5V33V3V2C0 1.5 0.434783 1 0.434783 1L10.5 11Z'
        fill={crown?.distal?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <PathFill
        id='mesial'
        d='M25.5 11.5V25L35.5652 35C35.5652 35 36 34.5 36 34V33.5V33V3V2C36 1.5 35.5652 1 35.5652 1L25.5 11.5Z'
        fill={crown?.mesial?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <PathFill
        id='occlusial'
        d='M11 25V11H25V25H11Z'
        fill={crown?.occlusial?.action.fillColor || 'white'}
        selectedColor={selectedColor}
        isTarget={isTarget}
        onClick={(e) => handleSurfaceSelection(e.currentTarget.id)}
      />
      <g id='Vector'>
        <mask id='path-6-inside-1' fill='white'>
          <path d='M34 36H2C0.895431 36 0 35.1046 0 34V2C0 0.895431 0.895432 0 2 0H34C35.1046 0 36 0.895432 36 2V34C36 35.1046 35.1046 36 34 36Z' />
        </mask>
        <path
          d='M0.46967 1.53033L11.4697 12.5303L12.5303 11.4697L1.53033 0.46967L0.46967 1.53033ZM11.4697 23.4697L0.46967 34.4697L1.53033 35.5303L12.5303 24.5303L11.4697 23.4697ZM23.4697 24.5303L34.4697 35.5303L35.5303 34.4697L24.5303 23.4697L23.4697 24.5303ZM24.5303 12.5303L35.5303 1.53033L34.4697 0.46967L23.4697 11.4697L24.5303 12.5303ZM2 37.5H34V34.5H2V37.5ZM37.5 34V2H34.5V34H37.5ZM34 -1.5H2V1.5H34V-1.5ZM-1.5 2V34H1.5V2H-1.5ZM2 -1.5C0.0670053 -1.5 -1.5 0.0670025 -1.5 2H1.5C1.5 1.72386 1.72386 1.5 2 1.5V-1.5ZM37.5 2C37.5 0.0670049 35.933 -1.5 34 -1.5V1.5C34.2761 1.5 34.5 1.72386 34.5 2H37.5ZM34 37.5C35.933 37.5 37.5 35.933 37.5 34H34.5C34.5 34.2761 34.2761 34.5 34 34.5V37.5ZM2 34.5C1.72386 34.5 1.5 34.2761 1.5 34H-1.5C-1.5 35.933 0.067003 37.5 2 37.5V34.5Z'
          fill='#333333'
          mask='url(#path-6-inside-1)'
        />
      </g>
      <path
        id='Vector 40'
        d='M11 11V25H25V11H11Z'
        stroke='#333333'
        strokeWidth='1.5'
      />
    </SVG>
  );
};
