/**
 * Created by raymond on 17/07/15.
 */
"use strict";

var React = require("react");
var RestHelper = require("../../helpers/restHelper.js");
// for notification
var Toastr = require("toastr");
// TwitSearcherForm component
var TwitSearcherForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var searchText = React.findDOMNode(this.refs.searchText);
        this.props.addResultList(searchText.value);
        // And set back to empty for search text.
        // 60000 ms = 1 min.
        Toastr.success('Searching "'.concat(searchText.value).concat('" tweets on Twitter now ...'), "SEARCHING", {timeout: 60000});
        searchText.value = '';

    },

    render: function() {
        var formDivStyle = {
            width: '500px',
            marginLeft: '420px'
        };

        return (
            <div className = "alert alert alert-info" style={formDivStyle} >
                <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                           <span className="input-group-btn">
                             <button className="btn btn-danger" type="button">Search Twitter</button>
                            </span>
                            <input type="text" style={{width: '350px', marginLeft: '5px'}}name="searchText" className="form-control" placeholder="Search for..." ref="searchText" required/>
                        </div>
                </form>
            </div>

        );
    }
});

var TwitSearcher = React.createClass({
    getInitialState: function() {
        return {
            searchText: " ",
            searchResults: []
        };
    },

    addResultList: function(searchTextinput) {
        this.setState({searchText: searchTextinput});

    },

    render: function() {
        var component = this;
        var count = 0;
        var resultHeader = (<span> </span>);
        if (this.state.searchText.length > 2) {
            var searchUrl = "http://localhost:7777/api/results/";
            RestHelper.get(searchUrl.concat(this.state.searchText))
                .then(function (data) {
                    component.setState({searchResults: data});
                });
        }

        var res = this.state.searchResults.map(function (result) {
            count += 1;

            var rawDate = result.created.indexOf("+");
            var created = result.created.substr(0, rawDate).concat( " ".concat(result.created.slice(-4)));

            return (
                <div className="alert alert alert-success">
                    <p className="btn btn-primary"> {count} </p>
                    <br/> <br/>
                    <ol>
                        <li key={result.tweetId}> Tweet Id: {result.tweetId}</li>
                        <li key={result.lang}> Language: {result.lang}</li>
                        <li key={result.created}> Created: {created}</li>
                        <li key={result.source}> Source: <span dangerouslySetInnerHTML={{__html: result.source }}/></li>
                        <li key={result.text}> Content: <span style={{color: 'black'}} className="lead"> {result.text} </span></li>
                    </ol>
                </div>);
        });


        var gitHubLinkStyle = {
            position: "fixed",
            top: "0px",
            right: "0px"
        };

        var gitHubMe = (<a style={gitHubLinkStyle} href="https://github.com/raymondAntonio" target="_blank">
            <img src={"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"}/>
            </a>);

        var resultLength = this.state.searchResults.length;
        var searchText = this.state.searchText;

        if (resultLength > 0) {
            resultHeader = (<h2 className="alert alert alert-warning"> Results for "{searchText}" : {resultLength} tweets </h2>);
        }

        if ((resultLength < 1) && (searchText.length > 1)) {
            resultHeader = (
                <div style ={{width: '500px', marginLeft: '420px'}} className="progress">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
                        <span className="sr-only">100% Complete</span>
                    </div>
                </div>);

            /*// 15 secs after searching with no results.
            setTimeout(function(){
                // 15000 ms = 15 secs.
                Toastr.error('No result found for "'.concat(searchText).concat('" tweets on Twitter now ...'), "NOT FOUND", {timeout: 60000});
            }, 15000);*/
        }

        return (
            <div>
                {gitHubMe}
                <TwitSearcherForm addResultList={this.addResultList} />
                {resultHeader}
                {res}
            </div>
        );
    }
});

module.exports = TwitSearcher;
