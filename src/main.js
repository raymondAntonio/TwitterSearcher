/**
 * Created by raymond on 11/07/15.
 */
// This  the js file to bootstrap/entry point the whole app.
// TODO - can be fixed by using iffi pattern or disabled jslint for this file
$ = jQuery = require('jquery');
var React = require("react");
var Router = require("react-router");
var Routes = require("./routes");

(function(win) {
    "use strict";
    // se hash location fi not using react server side otherwise it won't work if using location!!
    Router.run(Routes, Router.HashLocation, function(Handler){
        React.render(<Handler />, document.getElementById("app"));
    });
}(window));





