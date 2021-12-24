import React, { Component } from "react";
import moment from "moment";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-2 ">
        <div className="card">
            <div style={{display : "flex", justifyContent : "flex-end", position : "absolute", right : "0"}}>
              <span className="badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="class-muted">
                By {author ? author : "Unknown"}
              </small>
            </p>
            <p className="card-text">
              <small className="class-muted">
                <i> {moment(date).fromNow()} </i>{" "}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-info"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
