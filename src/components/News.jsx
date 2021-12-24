import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    
    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general',
    };

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    articles = []
    constructor(props) {
        super(props);
        this.state = {
            articles : this.articles,
            loading : false,
            page : 1,
            totalResults : 0
        };
        document.title = `NewsMonk - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async componentDidMount() {
       this.updateNews();
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category
    }&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
        this.setState({loading : true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.setState({loading : false});
        this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults});
        this.props.setProgress(100);
    }

    handlePrevious = async() => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category
    // }&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    //     this.setState({loading : true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({loading : false});
    //     this.setState({articles : parsedData.articles});
        this.setState({
            page : this.state.page - 1,
        });
        this.updateNews();
    }

    handleNext = async() => {
        if(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category
        // }&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
        //     this.setState({loading : true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({loading : false});
        //     this.setState({articles : parsedData.articles});
            this.setState({
                page : this.state.page + 1,
            });
            this.updateNews();
        }
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults});
    }
    render() {
        return (
            <div className='my-3'>
                <h2 className='text-center' style={{margin : '35px 0px', marginTop : '90px'}}>NewsMonk - Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2> 
                {this.state.loading && <Spinner />}              
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={(this.state.articles.length) !== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map ((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem title = { 
                                            element.title ? element.title.slice(0, 50) : "No Title"} description = {element.description ? element.description.slice(0, 65) : "No Descrition"} imageUrl = {element.urlToImage ? element.urlToImage : "https://source.unsplash.com/random/?news"} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                
                {/* <div className="container d-flex justify-content-between">
                    <button disabled = {this.state.page <= 1} type='button' onClick={this.handlePrevious} className="btn btn btn-secondary">
                        &larr; Previous
                    </button>
                    <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' onClick={this.handleNext} className="btn btn btn-secondary">
                        Next &rarr;
                    </button>
                </div> */}
            </div>
        )
    }
}

export default News
