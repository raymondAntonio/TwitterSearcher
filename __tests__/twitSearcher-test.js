/**
 * Created by raymond on 24/10/15.
 */
// Stop the automatic mocking.
jest.dontMock('../src/components/twitSearcher/twitSearcher');

var React = require ("react");
var ReactDOM = require ("react-dom");
var TestUtils = require ("react-addons-test-utils");

const TwitSearcher = require('../src/components/twitSearcher/twitSearcher');

describe('twitSearcher', () => {
    it('display results after submitting', () => {
        // Render twitSearch form in the document
        var twitForm = TestUtils.renderIntoDocument(
            <TwitSearcher /> );
        var twitNode = ReactDOM.findDOMNode(twitForm);
            // Verify that it's Off by default
        expect(twitNode.textContent).toEqual('Off');
            // Simulate a submit and verify that the search result is being displayed
        TestUtils.Simulate.change( TestUtils.findRenderedDOMComponentWithTag(twitForm, 'app') );
        expect(twitNode.textContent).toEqual('On');

    });
});