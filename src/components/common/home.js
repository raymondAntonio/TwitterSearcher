/**
 * Created by raymond on 17/07/15.
 */
"use strict";

var React = require("react");
var TwitSearcher = require("../twitSearcher/twitSearcher");

// HomePage component
var HomePage = React.createClass({

    render: function() {
        return (
            <div>
                <TwitSearcher />
            </div>
        );
    }
});

module.exports = HomePage;
