<h1><B>Test Star Wars Search Pportal With Cypress</B></h1>

<h3><B>Assignment</B></h3>

<B>Steps to complete the assignment</B>

1. Updating angular + cypress builder and lint under angular.json, and install the package again with 
```
npm install --legacy-peer-deps
```
to make sure commands below works
```
ng serve
ng lint
ng e2e
```

2. Implementing cypress cucumber tests
Add data-testid for elements, for example:
```
<div *ngIf="searchType === 'planets'" data-testid="planetSearch">
```
install @badeball/cypress-cucumber-preprocessor
```
npm install @badeball/cypress-cucumber-preprocessor
```

3. Test run:
run test with 
```
ng e2e
```
and please view the test result under ./report/cypress

4. Bug investigation & fix

<h3><B>Bugs</B></h3>

<B>Bug list</B>
1. There is no pagination: if the user searches people with str 's', and there are 39 people in the backend response (swapi.dev/api/people/?search=s), but on frondend, there is 10 shown.
2. The search result can't be cleared by using empty str search. 

<B>Bug fix</B>
