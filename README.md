# Intro

WARNING: Use at your own risk. At the time of writing, this is a working tool, but it is a quickly thrown-together tool not meant to be particularly reliable or maintained long-term. Since it essentially uses screen-scraping, it's pretty likely to break as Urban Airship updates their UI.

Since Urban Airship doesn't have an API for creating apps, and I have close to 100 apps to create, I wrote a tool to automate it. It creates the app(s) and selects the Android and iOS platforms, and does nothing else. It should be pretty easy to add additional functionality if you wish.

It checks for existing apps (based on name and production status) and skips those that already exist.

It uses CasperJS (which uses PhantomJS). I wrote (and have only tested) this on Windows. CasperJS has CLI argument parsing problems on Windows, so everything is configured by a config file.

# Requirements

* PhantomJS - http://phantomjs.org/download.html
* CasperJS - http://casperjs.org/

Chocolatey is an easy way to install these on Windows. https://chocolatey.org/

# Setup

Copy `config.default.js` to `config.js` and edit the new file, setting up your credentials and apps you wish to create.

# Usage

After setting up `config.js`, simply run:

`casperjs ua.js`