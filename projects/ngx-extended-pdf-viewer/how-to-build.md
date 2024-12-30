# Preparations

You need a current node.js and roughly 20-30 minutes of time, maybe even less. Most of the build process is automated. This recipe shows the Unix and MacOS scripts, but there are also Windows batch files you can use. Sometimes the two sets of files diverge (because I'm lazy - feel free to blame me!). If you run into trouble, have a look at the Unix files. I use them much more often, so they are the "source of truth".

## Use the showcase to test your changes of ngx-extended-pdf-viewer

In a nutshell: you need three projects: pdf.js, ngx-extended-pdf-viewer and extended-pdf-viewer, all in the same parent folder.

![Folders required to build ngx-extended-pdf-viewer](./folder-structure.png)

### What is pdf.js?

ngx-extended-pdf-viewer is just a shallow wrapper arounds Mozilla's PDF viewer. This viewer, in turn, is an open-source project called pdf.js. However, I had to fork that library. Over time, I've implemented quite a few changes and improvements to pdf.js. When I'm talking about pdf.js, I usually refer to my fork, which is frequently updated with the latest changes implemented by the Mozilla team.

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
1. `git clone https://github.com/stephanrauh/pdf.js.git`
1. `mv pdf.js mypdf.js` (or `rename pdf.js mypdf.js` if you're using Windows)
1. `cd mypdf.js`
1. `npm install -g gulp-cli`
1. `npm install` (some versions of pdf.js require the `--force` flag)
1. `gulp generic` (not necessary - but it gives you faster feedback if there's a compile error)
1. `cd ../ngx-extended-pdf-viewer`
1. `npm run full`
1. Navigate to `http://localhost:4200`

## Living on the bleeding edge

I maintain two different versions of pdf.js. There's the branch I call stable, and there's the "bleeding edge" branch. The stable branch has a numeric name. At the time of writing, that's 2.14. The stable branch is based on the latest release of pdf.js.

The branch I call "bleeding edge" is based on the latest developer commits of pdf.js. Generally speaking, pdf.js has an extraordinary high quality, so it's unlikely you run into trouble using this version. There's a "but": when the Mozilla team modifies some source code I've also modified, I always have a hard time merging the two branches and adding the improvements from both sides. So I can't guarantee the "bleeding edge" branch to work. It does, 99% of the time, but don't take my word for it. Nonetheless, I'd like to encourage you to use it in development (but never in production!) because this way you can help me spot errors early.

Compiling the "bleeding edge" branch of pdf.js is easy:

1. `cd mypdf.js`
1. `git checkout bleeding-edge`
1. `cd ../ngx-extended-pdf-viewer``
1. `npm run full`

If you don't need the minified files, you can use `npm run quick` instead of `npm run full`.

## Dockerized smoke tests

The folder `compatibility-tests` contains tiny test suites. They are meant to be run after publishing a new version. They build an new greenfield projects in Docker and check if the PDF file renders correctly.

Currently, these test must be run manually. CD to one of the `AngularXX` folders and run the script `test.sh`.

I've noticed that the test often fail due to minor shifts of the UI. These shifts are usually so small you wouldn't even notice without the Playwright tests.
