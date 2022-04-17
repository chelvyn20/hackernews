import { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };

    this.needsToSearchTopStories = this.needToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    console.log('setSearchTopStories');
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    console.log('searchKey in setSearchTopStories: ' + searchKey);

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    console.log('oldHits: ' + oldHits);

    const updatedHits = [...oldHits, ...hits];
    console.log('updatedHits: ' + updatedHits);

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } },
      isLoading: false,
    });
    // console.log('results: ' + JSON.stringify(results));
  }

  fetchSearchTopStories(searchTerm, page) {
    console.log('fetchSearchTopStories');
    this.setState({ isLoading: true });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('result: ' + result);
        this.setSearchTopStories(result);
      });
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { searchTerm } = this.state;
    console.log('setSearchKey');
    this.setState({ searchKey: searchTerm });
    console.log('searchKey in componentDidMount: ' + this.state.searchKey);
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.log('searchKey in componentDidUpdate: ' + this.state.searchKey);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    console.log('submit');
    event.preventDefault();
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } },
    });
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state;
    console.log('searchKey: ' + searchKey);
    // console.log('results: ' + JSON.stringify(results));
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    console.log('page: ' + page);
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    console.log('list: ' + list);
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table list={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              More
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
