/**
 * Created by raymond on 18/10/15.
 */
"use strict";

var React = require("react");
var RouteHandler = require("react-router").RouteHandler;
var App = React.createClass({
    render: function() {
        return (
            <div>
                <div className ="container-fluid">
                   <RouteHandler/>
                </div>
            </div>
        );
    }



});

module.exports = App;
