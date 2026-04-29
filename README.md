# Better X to XCancel Redirect

A Chrome/Opera extension that redirects `x.com` and `twitter.com` links to `xcancel.com`. Instantly. Every time. No exceptions.

## Why another one?

Because every other extension I tried worked about 20% of the time. Click a link, land on x.com, swear, hit Ctrl+Shift+R, finally get to xcancel. Repeat forever.

Turns out most of them are doing it wrong. They use `chrome.webRequest` listeners (slow, has to wake a service worker) or content scripts that fire after the page already started loading (defeats the entire point). And none of them account for the browser's HTTP cache happily serving you stale x.com responses without ever making a network request the extension could intercept.

## How this one works

Two layers, both fast.

**Layer 1: `declarativeNetRequest`.** The redirect rule is registered with the browser at install time and runs in native code, before the request leaves your machine. No JavaScript, no service worker, no page load. The browser sees `x.com`, rewrites it to `xcancel.com`, done.

**Layer 2: Content script at `document_start`.** Catches the edge case where the browser serves x.com from cache and skips the network entirely. Fires before any of x.com's own scripts run, so you never see the page render.

Together they cover both fresh navigations and cached hits. It just works.

## Install

1. Download or clone this repo.
2. Open `opera://extensions` (or `chrome://extensions`).
3. Toggle **Developer mode** on.
4. Click **Load unpacked** and select the folder.

## Files
```
manifest.json   Extension config and permissions
rules.json      declarativeNetRequest redirect rules
redirect.js     Content script fallback for cached pages
```
## Coverage

Redirects all of:

- `x.com` and `www.x.com`
- `twitter.com`, `www.twitter.com`, `mobile.twitter.com`

Only top-level navigations are redirected, embedded tweets on other sites are left alone.

## Caveats

If xcancel ever goes down or moves, you'll need to disable the extension or point it at a different Nitter instance. Nitter-style scrapers come and go.

## License
MIT
Do whatever you want with it, don't sue me.
