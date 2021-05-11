import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { clinicIdVar } from '../../../../cache';
import { DIAGRAM_CATEGORIES } from '../../../../graphql/queries/diagramCategories';
import {
  GetDiagramCategories,
  GetDiagramCategoriesVariables,
} from '../../../../graphql/queries/__generated__/GetDiagramCategories';
import ActionTypeBox from './ActionTypeBox';
import { OptionsWrapper } from './DiagramOptions.elements';

const DiagramOptions = () => {
  const clinicId = clinicIdVar();
  const [isActionOpen, setActionOpen] = useState<{ [key: string]: boolean }>({
    diagnostic: false,
    procedure: true,
  });
  const { data } = useQuery<
    GetDiagramCategories,
    GetDiagramCategoriesVariables
  >(DIAGRAM_CATEGORIES, {
    variables: {
      clinicId,
    },
    fetchPolicy: 'cache-only',
  });

  const handleClick = (key: string) => {
    setActionOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  if (data === undefined) return <div>d</div>;

  const diagnosticCategories = data.diagramCategories.diagnostic;
  const procedureCategories = data.diagramCategories.procedures;

  
  return (
    <OptionsWrapper>
      <ActionTypeBox
        isOpen={isActionOpen.diagnostic}
        isSiblingOpen={isActionOpen.procedure}
        handleClick={() => handleClick('diagnostic')}
        title={'Diagnostic'}
        categories={diagnosticCategories}
      />
      <ActionTypeBox
        isOpen={isActionOpen.procedure}
        isSiblingOpen={isActionOpen.diagnostic}
        handleClick={() => handleClick('procedure')}
        title={'Procedures'}
        categories={procedureCategories}
      />
    </OptionsWrapper>
  );
};

export default DiagramOptions;
