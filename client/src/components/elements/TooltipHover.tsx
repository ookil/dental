import React from 'react';
import { useLayer, useHover, Arrow } from 'react-laag';
import { DarkArrow, HoverMenu } from './Tooltip.elements';

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

function TooltipHover({ children, content }: TooltipProps) {
  const [isOver, hoverProps] = useHover();

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: isOver,
    placement: 'bottom-center',
    auto: true,
    possiblePlacements: [
      'bottom-end',
      'bottom-center',
      'bottom-start',
      'top-end',
      'top-center',
      'top-start',
    ],
    triggerOffset: 6,
    arrowOffset: 6,
  });

  return (
    <>
      <span {...triggerProps} {...hoverProps}>
        {children}
      </span>
      {isOver &&
        renderLayer(
          <HoverMenu {...layerProps}>
            {content}
            <DarkArrow {...arrowProps} size={4} />
          </HoverMenu>
        )}
    </>
  );
}

export default TooltipHover;
