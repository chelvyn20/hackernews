import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_HPP,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH,
} from '../../constants';
import { Button } from '../Button';
import { Loading } from '../Loading';
import { Search } from '../Search';
import { Table } from '../Table';
import './index.css';

function Appful() {
  const [results, setResults] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [isLoading, setIsLoading] = useState(false);

  const setSearchTopstories = (result) => {
    console.log('setSearchTopStories');
    const { hits, _page } = result;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    console.log('oldHits: ' + oldHits);

    const updatedHits = [...oldHits, ...hits];
    console.log('updatedHits: ' + updatedHits);

    setResults({ ...results, [searchKey]: { hits: updatedHits, _page } });
    console.log('results: ' + results);
    setIsLoading(false);
  };

  const fetchSearchTopstories = async (_searchTerm, _page) => {
    console.log('fetchSearchTopstories');

    setIsLoading(true);
    const response = await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${_searchTerm}&${PARAM_PAGE}${_page}&${PARAM_HPP}${DEFAULT_HPP}`
    );
    const result = await response.json();
    console.log('result: ' + result);
    setSearchTopstories(result);
  };

  useEffect(() => {
    console.log('componentDidMount');
    console.log('setSearchKey');
    setSearchKey(searchTerm);
    console.log('searchKey: ' + searchKey);
    console.log('searchTerm: ' + searchTerm);
    fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }, []);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needToSearchTopStories = (_searchTerm) => {
    return !results[_searchTerm];
  };

  const onSearchSubmit = (event) => {
    setSearchKey(searchTerm);

    if (needToSearchTopStories(searchTerm)) {
      fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    console.log('submit');
    event.preventDefault();
  };

  const onDismiss = (id) => {
    const { _hits, _page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatedHits = _hits.filter(isNotId);

    setResults({ ...results, [searchKey]: { hits: updatedHits, _page } });
  };

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  console.log('page: ' + page);
  const list = (results && results[searchKey] && results[searchKey].hits) || [];
  console.log('list: ' + list);

  return (
    <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        >
          Search
        </Search>
      </div>
      <Table list={list} onDismiss={onDismiss} />
      <div className="interactions">
        {isLoading ? (
          <Loading />
        ) : (
          <Button onClick={() => fetchSearchTopstories(searchKey, page + 1)}>
            More
          </Button>
        )}
      </div>
    </div>
  );
}

export default Appful;
