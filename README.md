## Gistifier - A command line tool

Create a Gist from a set of file(s).


### Installation

```
npm install -g gistifier
```


### How to use

From your terminal go to the directory where your files reside and run,

``` bash
$ gistifier push <filename1> <filename2>
```

To push all files in current directory top level

```
$ gistifier push
```

To make your Gist public

```
$ gisitifer push <filename> --public
```

OR

```
$ gisitifer push <filename> -p
```


### Use Cases

1. Sharing multiple files quickly
2. Lightweight code review, as Gists can be commented upon.
