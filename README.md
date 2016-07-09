# Gokotta [![Dependency Status](https://david-dm.org/Zhangdroid/Gokotta.svg?style=flat-square)](https://david-dm.org/Zhangdroid/Gokotta)  [![devDependency Status](https://david-dm.org/Zhangdroid/Gokotta/dev-status.svg?style=flat-square)](https://david-dm.org/Zhangdroid/Gokotta#info=devDependencies)

![screenshot](https://raw.githubusercontent.com/Zhangdroid/Gokotta/master/resources/screenshot.png)

Gokotta is a simple music player, built by [electron](http://electron.atom.io/) and [vue](http://vuejs.org/).

**Note: This project is still in developing with many bugs, and using some experimental features. DO NOT use it on production**

support format: **mp3, aac and wav**

## Download

MacOS: [https://github.com/Zhangdroid/Gokotta/releases](https://github.com/Zhangdroid/Gokotta/releases)

Linux and Windows will be coming soon.

## Usage

Just click `add` and chose your music folder.

## Install

```
git clone https://github.com/Zhangdroid/Gokotta.git
cd Gokotta && npm install
```

## Run

Run this two commands in **different** console tabs:

```
npm run dev-server
npm run dev
```

## Package

```
npm run release
```

Or run this command for all platform:

```
npm run release-all
```

## TODO

* [x] Search
* [x] Setting
* [ ] Support Windows and Linux
* [ ] Custom list
* [ ] Plugin support
* [ ] Core Plugin(lyric, ID3 editor, Equalizer...)

## Credits

* [Electron](http://electron.atom.io/)
* [Vue](http://vuejs.org/)
* [wavesurfer.js](http://wavesurfer-js.org/)
* [musicmetadata](https://github.com/leetreveil/musicmetadata)
* [node-vibrant](https://www.npmjs.com/package/node-vibrant)
* [Logo](https://github.com/Zhangdroid/Gokotta/blob/master/src/assets/images/logo.png) from [http://logodust.com/](http://logodust.com/)

## License

[MIT License](https://github.com/Zhangdroid/Gokotta/blob/master/LICENSE)
