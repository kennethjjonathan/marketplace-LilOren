import React, { useEffect, useState, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import PaginationNav from '../PaginationNav/PaginationNav';

interface SearchPaginationProps {
  totalPage: number;
}

const SearchPagination = ({ totalPage }: SearchPaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginationArray = useMemo(() => {
    const sidePage: number = 2;
    const numberOfShownPage = sidePage + 5;

    if (numberOfShownPage >= totalPage) {
      const returnArray: number[] = [];
      for (let i = 1; i <= totalPage; i++) {
        returnArray.push(i);
      }
      return returnArray;
    }

    const leftSiblingIndex: number = Math.max(currentPage - sidePage, 1);
    const rightSiblingIndex: number = Math.min(
      currentPage + sidePage,
      totalPage,
    );

    const isLeftDotsShown: boolean = leftSiblingIndex > 2;
    const isRightDotsShown: boolean = rightSiblingIndex < totalPage - 2;

    if (!isLeftDotsShown && isRightDotsShown) {
      const leftItem = 1 + 2 * sidePage;
      const leftTemp: number[] = [];
      for (let i = 1; i <= leftItem; i++) {
        leftTemp.push(i);
      }
      return [...leftTemp, '...', totalPage];
    }

    if (isLeftDotsShown && !isRightDotsShown) {
      const rightItem = 1 + 2 * sidePage;
      const rightTemp: number[] = [];
      for (let i = totalPage - rightItem + 1; i <= totalPage; i++) {
        rightTemp.push(i);
      }
      return [1, '...', ...rightTemp];
    }

    if (isLeftDotsShown && isRightDotsShown) {
      const middleTemp: number[] = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        middleTemp.push(i);
      }
      return [1, '...', ...middleTemp, '...', totalPage];
    }
  }, [totalPage, currentPage]);

  return <>{/* <PaginationNav /> */}</>;
};

export default SearchPagination;
