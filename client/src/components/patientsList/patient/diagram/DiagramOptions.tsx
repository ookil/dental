import React, { useState } from 'react';
import ActionTypeBox from './ActionTypeBox';
import { OptionsWrapper } from './DiagramOptions.elements';

const diagnoCategories = [
  { id: '1', name: 'Umba' },
  { id: '2', name: 'Sadsdg' },
  { id: '3', name: 'DSFf' },
  { id: '4', name: 'sdgfsdfg' },
  { id: '5', name: 'dfgdfg' },
  { id: '6', name: 'hjjhl' },
  { id: '7', name: 'dfgdfgd' },
  { id: '8', name: 'fdgdh' },
];

const proceCategories = [
  { id: '11', name: 'ghkjk' },
  { id: '21', name: 'hjoil' },
  { id: '31', name: 'bm' },
  { id: '41', name: 'bnmbnm' },
  { id: '51', name: 'dfgjkfcdfg' },
  { id: '61', name: 'dfgd' },
  { id: '71', name: 'sdf' },
  { id: '81', name: 'fdgdh' },
];

const DiagramOptions = () => {
  const [isActionOpen, setActionOpen] = useState<{ [key: string]: boolean }>({
    diagnostic: false,
    procedure: true,
  });

  const handleClick = (key: string) => {
    setActionOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <OptionsWrapper>
      <ActionTypeBox
        isOpen={isActionOpen.diagnostic}
        isSiblingOpen={isActionOpen.procedure}
        handleClick={() => handleClick('diagnostic')}
        title={'Diagnostic'}
        categories={diagnoCategories}
      />
      <ActionTypeBox
        isOpen={isActionOpen.procedure}
        isSiblingOpen={isActionOpen.diagnostic}
        handleClick={() => handleClick('procedure')}
        title={'Procedures'}
        categories={proceCategories}
      />
    </OptionsWrapper>
  );
};

export default DiagramOptions;
