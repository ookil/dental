import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  GetDiagramCategories_diagramCategories_diagnostic,
  GetDiagramCategories_diagramCategories_procedures,
} from '../../../../graphql/queries/__generated__/GetDiagramCategories';
import { setCurrentAction } from '../../../../store/slices/diagramSlice';
import { RootState, useAppDispatch } from '../../../../store/store';
import TooltipHover from '../../../elements/TooltipHover';
import {
  ActionItem,
  ActionsList,
  BoxBody,
  BoxHeader,
  BoxRoot,
  CategoriesList,
  CategoryItem,
  FillColorBox,
  FlexBox,
  PaddingBox,
} from './DiagramOptions.elements';
import removeTooth from './icons/remove-tooth.jpg';

type ActionsProps = {
  title: string;
  isOpen: boolean;
  isSiblingOpen: boolean;
  categories:
    | GetDiagramCategories_diagramCategories_procedures[]
    | GetDiagramCategories_diagramCategories_diagnostic[];
  handleClick: () => void;
};

const ActionTypeBox = ({
  title,
  isOpen,
  isSiblingOpen,
  categories,
  handleClick,
}: ActionsProps) => {
  const [selectedCategoryIndex, setCategory] = useState(0);

  const selectedAction = useSelector(
    (state: RootState) => state.diagram.currentAction
  );

  const dispatch = useAppDispatch();

  const handleCategoryClick = (index: number) => {
    setCategory(index);
  };

  const handleActionClick = (action: any) => {
    dispatch(setCurrentAction(action));
  };

  return (
    <>
      <BoxRoot isOpen={isOpen} isSiblingOpen={isSiblingOpen}>
        <BoxHeader onClick={handleClick}>{title}</BoxHeader>

        <BoxBody isOpen={isOpen} isSiblingOpen={isSiblingOpen}>
          {isOpen && (
            <FlexBox>
              <CategoriesList>
                {categories.map(({ id, name }, index) => (
                  <CategoryItem
                    isActive={index === selectedCategoryIndex}
                    onClick={() => handleCategoryClick(index)}
                    key={id}
                  >
                    {name}
                  </CategoryItem>
                ))}
              </CategoriesList>
              <ActionsList>
                {categories[selectedCategoryIndex].actions.map((action) => (
                  <ActionItem key={action.id}>
                    {action.icon ? (
                      <TooltipHover content={action.name}>
                        <img src={removeTooth} alt='remove tooth' />
                      </TooltipHover>
                    ) : (
                      <TooltipHover content={action.name}>
                        <PaddingBox
                          isSelected={selectedAction?.id === action.id}
                          onClick={() => handleActionClick(action)}
                        >
                          <FillColorBox fillColor={action.fillColor} />
                        </PaddingBox>
                      </TooltipHover>
                    )}
                  </ActionItem>
                ))}
              </ActionsList>
            </FlexBox>
          )}
        </BoxBody>
      </BoxRoot>
    </>
  );
};

export default ActionTypeBox;
