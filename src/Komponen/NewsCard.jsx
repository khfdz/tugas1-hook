import React from "react";

const NewsCard = ({ item }) => {
  return (
    <div className="col-md-3">
      <div className="card my-2 mx-2">
        <img style={{ width: '100%', height: '200px' }} src={item.urlToImage} className="card-img-top" alt="..." />
        <div className="card-header" style={{ backgroundColor: 'white', height: '150px' }}>
          <h5 className="card-title">{item.title.slice(0, 35)}...</h5>
          <p>{item.author} - {new Date(item.publishedAt).toLocaleString()}</p>
        </div>
        <div className="card-body" style={{ height: '120px' }}>
          <p className="card-text">{item.description.slice(0, 80)}...</p>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: 'white' }}>
          <a href={item.url} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
