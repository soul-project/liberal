import { useEffect } from "react";
import { URLSearchParamsInit } from "react-router-dom";

const NUM_ITEMS_PER_PAGE = 10;

const usePagination = (
  totalCount: number,
  searchParams: URLSearchParams,
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: {
      replace?: boolean | undefined;
      state?: any;
    }
  ) => void
) => {
  const page = searchParams.get("page");

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: "1" });
    }
    if (!totalCount || !page) return;
    const totalPages = Math.ceil(totalCount / NUM_ITEMS_PER_PAGE);
    if (Number(page as string) > totalPages) {
      setSearchParams({ page: totalPages.toString() });
    }
  }, [page, setSearchParams, totalCount]);

  const setPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return {
    page: Number(page as string),
    totalPages: Math.ceil(totalCount / NUM_ITEMS_PER_PAGE),
    numItemsPerPage: NUM_ITEMS_PER_PAGE,
    setPage,
  };
};

export default usePagination;
