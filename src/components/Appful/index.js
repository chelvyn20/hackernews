import { useEffect, useState } from 'react';
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
import { Search } from '../Search';
import { Table } from '../Table';
import './index.css';

function Appful() {
  const [results, setResults] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);

  const setSearchTopstories = (result) => {
    const { hits, page } = result;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    setResults({ ...results, [searchKey]: { hits: updatedHits, page } });
  };

  const fetchSearchTopstories = async (searchTerm, page) => {
    const response = await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    );
    const result = await response.json();
    setSearchTopstories(result);
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needsToSearchTopStories = (searchTerm) => {
    return !results[searchTerm];
  };

  const onSearchSubmit = (event) => {
    setSearchKey(searchTerm);

    if (needsToSearchTopStories(searchTerm)) {
      fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  };

  const onDismiss = (id) => {
    const { hits, page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    setResults({ ...results, [searchKey]: { hits: updatedHits, page } });
  };

  useEffect(() => {
    setSearchKey(searchTerm);
    fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }, [searchKey]);

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

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
        <Button onClick={() => fetchSearchTopstories(searchKey, page + 1)}>
          More
        </Button>
      </div>
    </div>
  );
}

export default Appful;
