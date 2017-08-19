/**
 * Created by raymond on 18/07/15.
 */
"use strict";

var React = require("react");
var Router = require("react-router");
//var DefaultRoute = Router.DefaultRoute;
var DefaultRoute = Router.createDefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
    <Route name="app" path="/" handler={require("./components/app")}>
        <DefaultRoute handler={require("./components/common/home")} />
        <NotFoundRoute handler={require("./components/common/notFound")} />
    </Route>
);
module.exports = routes;