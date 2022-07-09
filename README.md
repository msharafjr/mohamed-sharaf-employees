# Pair of employees who have worked together

Identify a pair of employees who have worked together on common projects for the longest period of time.\
Display all the common projects of the pair in a datagrid.

## Getting started

Install the project dependencies

- `yarn install` or `npm install`

Run the project on a development server.

- `yarn start` then open [http://localhost:3000](http://localhost:3000) to see it in action in your browser.

## Usage

1. Open the application on [http://localhost:3000](http://localhost:3000).

2. Click on `Enter CSV file` and pick up a file (should be [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file type).

3. All common projects will be displayed in a datagrid.

## Sample CSV data

Data must be formatted as follows:
`EmpID, ProjectID, DateFrom, DateTo`

e.g.

```csv
1, 1, 2010/1/01, 2010/12/31
2, 1, 2010/6/30, NULL
3, 2, 2010/1/15, 2015/1/14
...
```

## Demo

You can find a demo version [here](https://pair-of-employees.surge.sh).
