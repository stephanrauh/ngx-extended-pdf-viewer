# How to build ngx-extended-pdf-viewer from source

Do you want to submit a pull request? Or maybe you're just curious, or you're hunting down a nasty bug that might lurk in the library?

Then you'll want to compile and test the library locally. It's easy - you can get it up and running in 15 minutes.

## Preparations

You need a current node.js and a current Angular installation. Most of the build process is automated. It works on Windows, MacOS, and Linux.

## Folder structure

In a nutshell: you need three projects: pdf.js, ngx-extended-pdf-viewer and extended-pdf-viewer, all in the same parent folder. The walk-throughs below start with creating a common parent folder called "pdf".

![Folders required to build ngx-extended-pdf-viewer](./folder-structure.png)

### What is pdf.js? I thought we're talking about ngx-extended-pdf-viewer?

ngx-extended-pdf-viewer is just a shallow wrapper arounds Mozilla's PDF viewer. This viewer, in turn, is an open-source project called pdf.js. However, I had to fork that library. Over time, I've implemented quite a few changes and improvements to pdf.js. When I'm talking about pdf.js, I usually refer to my fork, which is frequently updated with the latest changes implemented by the Mozilla team.

### Please don't modify the files viewer-x.x.x.mjs or pdf.worker-x.x.x.mjs manually

pdf.js compiles into two files: the viewer file and the worker file. Many developers find and fix an error directly in one of these files. Please don't do that. Of course, I'll happily accept your pull request, but do yourself a favor and edit the real source code. You'll have to compile pdf.js from source, so it'll take a little longer, but you'll benefit from a real source code with decent formatting and (sometimes) even comments. Confused? Don't be - you'll see in a minute how everything belongs together. In fact, the walk-through below always starts with compiling pdf.js.

### How to build it all from scratch

As mentioned before, you need three projects:

- my clone of pdf.js,
- ngx-extended-pdf-viewer,
- and extended-pdf-viewer-showcase

Put all of them in the same parent folder. pdf.js needs to be built first, followed by ngx-extended-pdf-viewer and extended-pdf-viewer-showcase.

1. `mkdir pdf`
1. `cd pdf`
1. `git clone git@github.com:stephanrauh/extended-pdf-viewer-showcase.git`
1. `cd extended-pdf-viewer-showcase`
1. `npm install`
1. `cd ..`
1. `git clone https://github.com/stephanrauh/pdf.js.git mypdf.js`
1. `cd mypdf.js`
1. `npm install -g gulp-cli`
1. `npm install` (some versions of pdf.js require the `--force` flag)
1. `gulp generic` (not necessary - but it gives you faster feedback if there's a compile error)
1. `gulp server` (not necessary - but it allows you to start pdf.js without ngx-extended-pdf-viewer and to test is on localhost:8888. That's a good smoke test)
1. `cd ..`
1. `git clone git@github.com:stephanrauh/ngx-extended-pdf-viewer.git`
1. `cd ngx-extended-pdf-viewer`
1. `npm run run:all:old` (compiles everything: the base library, ngx-extended-pdf-viewer, and the showcase. Plus, the command starts the showcase application)
1. Navigate to `http://localhost:4200`

## Living on the bleeding edge

It's time for some background information.

I maintain two different versions of pdf.js. There's the git branch I call stable, and there's the git branch called "bleeding edge". The stable branch has a numeric name. At the time of writing, that's 4.10, soon to be updated to 5.3. Usually, the stable branch is based on the latest release of pdf.js. Of course, sometime my private life is more demanding - when that happens, the stable branch lags several versions behind pdf.js. Recently, they've started to publish new versions every 4-6 weeks, making it even harder to catch up.x

The branch I call "bleeding edge" is based on the latest developer commits of pdf.js. Generally speaking, pdf.js has an extraordinary high quality, so it's unlikely you run into trouble using this version. There's a "but": when the Mozilla team modifies some source code I've also modified, I always have a hard time merging the two branches and adding the improvements from both sides. So I can't guarantee the "bleeding edge" branch to work. It does, 95% of the time, but don't take my word for it. I'd like to encourage you to use it in development (but never in production!) because this way you can help me spot errors early.

Compiling the "bleeding edge" branch of pdf.js is easy:

1. `cd mypdf.js`
1. `git checkout bleeding-edge`
1. `cd ../ngx-extended-pdf-viewer``
1. `npm run run:all:old`

## Wait, what? Why's there an "old" in npm run run:all:old?

Two friends of mine, Alexander and Julian, kindly submitted a new version of the showcase. You can start it with `npm run run:all`. Thing is, the showcase is huge. I have to migrate every demo from the old (or current) showcase to the new one. That'll take a while. Until then, the "old" showcase is the reference application. I'm using it to run my compatibility tests.

## Dockerized smoke tests

The folder `compatibility-tests` contains tiny test suites. They are meant to be run after publishing a new version. They build an new greenfield projects in Docker and check if the PDF file renders correctly.

Currently, these test must be run manually. CD to one of the `AngularXX` folders and run the script `test.sh`.

I've noticed that the test often fail due to minor shifts of the UI. These shifts are usually so small you wouldn't even notice without the Playwright tests. Even so, at the time of writing, the tests are broken.

## I'm in a hurry, and my changes only affect the Angular code of the library

If you haven't modified pdf.js, you don't have to recompile it every time. The scripts `npm run both:old` or `npm run both` compile the library and start the showcase.

# The build pipeline

The folder `pdf/ngx-extended-pdf-viewer/build-tools` contain the build scripts. They're JavaScript files so they run both on Windows and MacOS or Linux. The only pre-requisite is you've installed node.js - but if you're an Angular developer, you've got that, anyways.

The name of the scripts tells you what the script is doing (or so I hope):

- 1-build-base-library.js compiles pdf.js.
- 2-build-library.js compile ngx-extended-pdf-viewer.
- 4-build-old-showcase.js compiles the old showcase.
- 4-1-run-old-showcase.js compiles the old showcase and starts it (`ng s -o`).
- 1241-run-base-library-and-library-and-old-showcase combines the scripts 1, 2, and 4-1. In other words, it compiles everything and starts the old showcase. It's identical to `npm run run:all:old`.

The `package.json` of the ngx-extended-pdf-viewer project contains scripts to run most of the JavaScript build files. However, most of the time, `npm run run:both:old` and `npm run run:all:old` is all you need.

# Submitting pull requests

Pull requests are always welcome! Most people send me pull requests improving the Angular code, and that's the standard GitHub workflow: get a GitHub account, fork my library ngx-extended-pdf-viewer, modify it, commit and push your changes, and create a pull request on GitHub. Granted, it may be a bit confusing if you're doing it the first time, so feel free to ask your favorite AI how to do it, and you'll manage. We've all been there. :)

It might be a good idea to open a ticket on GitHub and discuss your idea with me and with the community. Experience shows that ideas get better by talking about them. In rare cases, I might decline your pull request. But don't worry: as far as I remember, that'd be a first. Just be aware your PR is more likely to be accepted if I already know about it.

If your pull requests also involve pdf.js, it becomes (sort of) mandatory to open a ticket at https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues. Otherwise, I might miss your pull requests, or I might respond late. The same applies to pull request of the showcase, and even bug tickets you open at the showcase bugtracker. I might miss them. Of course, I get the emails, so I don't have an excuse to miss them, but when I wonder what to do next, I usually only look at https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues.
