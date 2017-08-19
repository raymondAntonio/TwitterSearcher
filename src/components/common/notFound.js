/**
 * Created by raymond on 18/07/15.
 */
"use strict";
var React = require("react");
var Link = require("react-router").Link;

var NotFound = React.createClass({

    render: function() {
        return (
            <div className="alert alert-danger">
                <h1> 404 PAGE NOT FOUND</h1>
                <h4> Sorry, Please move on...nothing to see here. </h4>
                <img src={'../../images/shamanking.jpg'} />
                <h3><Link to="app"> BACK TO HOME </Link> </h3>
            </div>

        );
    }
});

module.exports = NotFound;

