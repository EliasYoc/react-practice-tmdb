import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import { VariableSizeList, VariableSizeListProps } from "react-window";

interface CustomVariableSizeListProps
  extends Pick<
    VariableSizeListProps,
    "itemData" | "children" | "height" | "width" | "itemCount"
  > { }

const CustomVariableSizeList = ({
  children,
  ...props
}: CustomVariableSizeListProps) => {
  const { itemData } = props;
  const listRef = useRef<VariableSizeList | null>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);

  useEffect(() => {
    const getInitiaalItemSizes = () => {
      // la primera vez se renderizan todos los elementos en VariableSizeList antes de virtualizar

      const heights = Array.from({ length: itemData.length }, (_, i) => {
        const $castGrid = document.getElementById(`cast-grid-${i}`) as Element;

        let computedStyle = null;
        if ($castGrid) {
          computedStyle = getComputedStyle($castGrid);
        }

        return computedStyle ? parseInt(computedStyle.height) : 0;
      });

      setItemHeights(heights);
      if (listRef.current) listRef.current.resetAfterIndex(0);
    };
    const recalculateItemSizes = throttle(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLDivElement>(".cast-grid")
      );

      const $firstElementWithAvailableHeight = elements.find(($el) => {
        const computedStyle = getComputedStyle($el);
        return computedStyle?.height;
      });

      const firstElementHeight = $firstElementWithAvailableHeight
        ? parseInt(getComputedStyle($firstElementWithAvailableHeight)?.height)
        : 0;

      setItemHeights((prev) => {
        return prev.map((itemHeight, i) => {
          if (i + 1 < prev.length) return firstElementHeight;
          return itemHeight;
        });
      });

      if (listRef.current) listRef.current.resetAfterIndex(0);
    }, 150);

    window.addEventListener("resize", recalculateItemSizes);
    getInitiaalItemSizes();
    return () => {
      window.removeEventListener("resize", recalculateItemSizes);
    };
  }, [itemData.length]);

  const spacing = 16;

  return (
    <VariableSizeList
      {...props}
      ref={listRef}
      itemSize={(index) => {
        if (!itemHeights[index]) return 0;
        return itemHeights[index] + spacing;
      }}
    >
      {children}
    </VariableSizeList>
  );
};

export default CustomVariableSizeList;
