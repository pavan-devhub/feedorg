import { useEffect, useState } from 'react';

/**
 * Splits an already-loaded list into pages for <ListPager>: this page's items plus the paging
 * state. Goes back to page 1 whenever `resetKey` changes - pass something built from the filters.
 */
export default function usePagedList(items, pageSize, resetKey) {
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [resetKey]);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  // A list that shrank under the current page (e.g. a refresh) would otherwise show an empty page.
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  return {
    page: current,
    pageCount,
    pageSize,
    start,
    total: items.length,
    pageItems: items.slice(start, start + pageSize),
    setPage,
  };
}
