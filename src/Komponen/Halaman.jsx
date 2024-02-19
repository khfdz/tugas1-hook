import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NewsCard from "./NewsCard";

const Halaman = () => {
  const [currentQuery, setCurrentQuery] = useState("bitcoin");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchNews(1, currentQuery);
  }, []);

  useEffect(() => {
    if (currentQuery !== "") {
      fetchNews(1, currentQuery);
    }
  }, [currentQuery]);

  const searchByTitle = () => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const fetchNews = async (page, q) => {
    console.log(`Fetching News for ${q}, Page Number ${page}...`);
    const url = `https://newsapi.org/v2/everything?q=${q}&from=2024-02-1&pageSize=20&page=${page}&sortBy=popularity&apiKey=53de3838f3ef4745b2d5dc60e1155f14`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setTotalResults(data.totalResults);
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery);
    searchByTitle();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      fetchNews(currentPage - 1, currentQuery);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    fetchNews(currentPage + 1, currentQuery);
  };

  const handleCategoryClick = (category) => {
    setCurrentQuery(category);
  };

  const displayData = searchQuery ? searchResults : articles;

  return (
    <div>
      <Navbar
        handleCategoryClick={handleCategoryClick}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
      />
      <div className="container">
        <h1>Welcome to News APP ({totalResults} Results)</h1>
        <div className="row content">
          {displayData && displayData.length > 0 ? (
            displayData.map((item, index) => (
              <NewsCard item={item} />
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>

        <div className="d-flex justify-content-around my-3">
          <button className="btn btn-primary" id="previousPage" onClick={handlePreviousPage}>&lt; Previous Page</button>
          <button className="btn btn-primary" id="nextPage" onClick={handleNextPage}>Next Page &gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Halaman;
