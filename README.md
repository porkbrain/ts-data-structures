# TypeScript Data Structures

Exports data structures for TypeScript. See the list of the structures below or
in the `docs/` directory.

## Installation

`npm i @bausano/data-structures -S`

## Optional
Optional data structure is based on Rust `Option` enum. It removes the hassle of
checking for `null` or `undefined` in your code and provides set of useful methods
for dealing with potentially missing data.

See [the documentation](docs/OPTIONAL.md) for this package.

## Pipeline
Extracted from `@exteranto/framework`, pipeline sends data through filters that
modify it. Filters functions take the data from previous filter as input and
outputs an input for the next one.

See [the documentation](docs/PIPELINE.md) for this package.

## PriorityQueue
Inspired by Java's `PriorityQueue<T extends Sortable>`. Sorts elements based on the
comparison function the type `T` provides and also optionally limits the size.

See [the documentation](docs/PRIORITY-QUEUE.md) for this package.

## Result
Work in progress.

## Vector
Work in progress.
