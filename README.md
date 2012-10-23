
# insights-chrome

  Chrome Extension to see engine.io and socket.io data.

![](http://cl.ly/image/0d3q1l2s0U1m/Image%202012.10.23%2012:21:44%20PM.png)

## Installation

Temporarily, go to `about:extensions` and with "Developer mode" enabled
press "Load unpacked extension…" and browse to this extension.

## How to use

Due to Chrome sandbox limitations, you need to make sure to load
`engine.io-chrome.js` in the page that you want to inspect traffic for:

```html
<script src="engine.io.js"></script>
<script src="engine.io-chrome.js"></script>
```
