### Tweet searcher ### 2015

A. This is an example of Twitter feeds-searching app implemented in Javascript employing
Nodejs runtime environment predominantly through Reactjs library and Expressjs framework  developed in the TDD Environment.



### The minimum required tools and technology to run the app successfully are the following: ###
1. nodejs https://nodejs.org
2. npmjs https://www.npmjs.com/
2. gulp http://gulpjs.com/
4. The internet connection


### How to get set up and run the app ? ###

1. Git clone this repository into your local machine

2. Once the cloning in the step 1 has completed then in the cli, navigate to the folder where gulpfile.js is resided in the folder you just cloned and then run gulp
   by just typing gulp in cli and see the program setting up itself until it is ready to be accessed via a web browser

3. Once the app is ready, fire up a web browser then go to http://localhost:9005 and
start searching by typing anything on the search string to find any posted tweet having that search text in it anywhere including
free form text eg. facebook, @facebook and/or #facebook

4. That's it. Happy searching! :) (please note: recently Twitter has imposed the maximum limit of searches
you can do via their API within 15 mins window and this app relies heavily on the Twitter API. If the search gives no results for no obvious reason after searching away for a while then
one of the likely culprits is the app has exceeded the maximum searching limit imposed the Twitter.inc. code:88
The workaround for this issue is just  give the searching a pause for 15 mins or so then it should fix back itself.
Thank you.