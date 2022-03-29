import { useEffect } from "react";
import { NextRouter } from "next/router";

const NUM_ITEMS_PER_PAGE = 10;

const usePagination = (totalCount: number, router: NextRouter) => {
  const { page } = router.query;

  useEffect(() => {
    if (router.isReady) {
      if (!page) {
        router.query.page = "1";
        router.push(router);
      }
      if (!totalCount || !page) return;
      const totalPages = Math.ceil(totalCount / NUM_ITEMS_PER_PAGE);
      if (Number(page as string) > totalPages) {
        router.query.page = totalPages.toString();
        router.push(router);
      }
    }
  }, [page, router, totalCount]);

  const setPage = (page: number) => {
    if (router.isReady) {
      router.query.page = page.toString();
      router.push(router);
    }
  };

  return {
    page: Number(page as string),
    totalPages: Math.ceil(totalCount / NUM_ITEMS_PER_PAGE),
    numItemsPerPage: NUM_ITEMS_PER_PAGE,
    setPage,
  };
};

export default usePagination;
