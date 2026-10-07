import { useCallback, useEffect, useState } from 'react';

const EMPTY_PAGE = { items: [], total: 0, totalPages: 1 };

/**
 * Pages a list on the server. `fetchPage({ page, size })` (`page` 0-based) must resolve to the
 * backend's { items, total, page, size, totalPages } (see PageDto) and should be memoized on the
 * list's filters with useCallback: a new one starts again from page 1. Returns the page on show,
 * the raw response, and the paging state <ListPager> and the admin <Pagination> need; `reload()`
 * fetches the page on show again, e.g. after an edit or delete. While a page loads, the previous
 * one stays on show.
 */
export default function useServerPagedList(fetchPage, initialPageSize) {
  // The page is kept with the fetcher it belongs to, so new filters show page 1 straight away
  // instead of first fetching the old page number with them.
  const [paging, setPaging] = useState({ fetchPage, page: 1 });
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [result, setResult] = useState(EMPTY_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const page = paging.fetchPage === fetchPage ? paging.page : 1;
  const setPage = useCallback((next) => setPaging({ fetchPage, page: next }), [fetchPage]);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchPage({ page: page - 1, size: pageSize })
      .then((data) => { if (!cancelled) setResult(data || EMPTY_PAGE); })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to load.');
          setResult(EMPTY_PAGE);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [fetchPage, page, pageSize, reloadKey]);

  const pageCount = Math.max(1, result.totalPages || 1);

  // Rows removed since the page was picked (a delete, or another admin) can leave it past the
  // end - step back to the last one.
  useEffect(() => {
    if (!loading && page > pageCount) setPage(pageCount);
  }, [loading, page, pageCount, setPage]);

  return {
    items: result.items,
    result,
    loading,
    error,
    reload,
    pager: {
      page,
      pageCount,
      pageSize,
      start: (page - 1) * pageSize,
      total: result.total,
      setPage,
      setPageSize: (size) => {
        setPageSize(size);
        setPage(1);
      },
    },
  };
}
