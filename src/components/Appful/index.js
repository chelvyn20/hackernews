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
import { Loading } from '../Loading';
import { Search } from '../Search';
import { Table } from '../Table';
import './index.css';

function Appful() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState(null);

  const setSearchTopStories = (result) => {
    console.log('setSearchTopStories');
    const { hits, page } = result;
    console.log('searchKey in setSearchTopStories: ' + searchTerm);

    const oldHits =
      results && results[searchTerm] ? results[searchTerm].hits : [];
    console.log('oldHits: ' + oldHits);

    const updatedHits = [...oldHits, ...hits];
    console.log('updatedHits: ' + updatedHits);

    setResults({ ...results, [searchTerm]: { hits: updatedHits, page: page } });
    // console.log('results: ' + JSON.stringify(results));
    setIsLoading(false);
  };

  const fetchSearchTopStories = async (searchTerm, page) => {
    console.log('fetchSearchTopStories');

    setIsLoading(true);
    const response = await fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    );
    const result = await response.json();
    console.log('result: ' + result);
    setSearchTopStories(result);
  };

  useEffect(() => {
    console.log('componentDidMount');
    console.log('setSearchKey');
    setSearchKey(searchTerm);
    console.log('searchKey in componentDidMount: ' + searchKey);
    fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }, []);

  useEffect(() => {
    console.log('componentDidUpdate');
    console.log('searchKey in componentDidUpdate: ' + searchKey);
  });

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needToSearchTopStories = (searchTerm) => {
    return !results[searchTerm];
  };

  const onSearchSubmit = (event) => {
    setSearchKey(searchTerm);

    if (needToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    console.log('submit');
    event.preventDefault();
  };

  const onDismiss = (id) => {
    const { hits, page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    setResults({ ...results, [searchKey]: { hits: updatedHits, page: page } });
  };

  console.log('searchKey: ' + searchKey);
  //   console.log('results: ' + JSON.stringify(results));
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
          <Button onClick={() => fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        )}
      </div>
    </div>
  );
}

export default Appful;
