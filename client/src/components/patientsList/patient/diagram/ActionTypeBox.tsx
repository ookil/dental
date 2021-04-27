import React from 'react';
import {
  BoxBody,
  BoxHeader,
  BoxRoot,
  CategoriesList,
  CategoryItem,
  FlexBox,
} from './DiagramOptions.elements';

type ActionsProps = {
  title: string;
  isOpen: boolean;
  isSiblingOpen: boolean;
  categories: any[];
  handleClick: () => void;
};

const ActionTypeBox = ({
  title,
  isOpen,
  isSiblingOpen,
  categories,
  handleClick,
}: ActionsProps) => {
  return (
    <>
      <BoxRoot isOpen={isOpen} isSiblingOpen={isSiblingOpen}>
        <BoxHeader onClick={handleClick}>{title}</BoxHeader>

        <BoxBody isOpen={isOpen} isSiblingOpen={isSiblingOpen}>
          {isOpen && (
            <FlexBox>
              <CategoriesList>
                {categories.map((category) => (
                  <CategoryItem key={category.id}>{category.name}</CategoryItem>
                ))}
              </CategoriesList>
            </FlexBox>
          )}
        </BoxBody>
      </BoxRoot>
    </>
  );
};

export default ActionTypeBox;
