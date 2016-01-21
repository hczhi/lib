var _map = {
    "res": {
        "map.js": {
            "uri": "/map.js",
            "type": "js"
        },
        "widget/cropper/cropper.html": {
            "uri": "/widget/cropper/cropper.html",
            "type": "html"
        },
        "widget/cropper/js/cropper.js": {
            "uri": "./js/cropper.js",
            "type": "js",
            "deps": [
                "static/css/base.less",
                "widget/cropper/css/cropper.less"
            ]
        },
        "static/css/base.less": {
            "uri": "./css/base.css",
            "type": "css",
            "deps": [
                "static/css/reset.less"
            ]
        },
        "static/css/reset.less": {
            "uri": "./css/reset.css",
            "type": "css"
        },
        "widget/cropper/css/cropper.less": {
            "uri": "./css/cropper.css",
            "type": "css"
        },
        "page/cropper.html": {
            "uri": "/cropper.html",
            "type": "html"
        },
        "page/index.html": {
            "uri": "/index.html",
            "type": "html"
        },
        "static/js/browser.min.js": {
            "uri": "./js/browser.min.js",
            "type": "js"
        },
        "static/js/jquery-1.11.2.min.js": {
            "uri": "./js/jquery-1.11.2.min.js",
            "type": "js"
        },
        "static/js/react-dom.js": {
            "uri": "./js/react-dom.js",
            "type": "js",
            "pkg": "p0"
        },
        "static/js/react.js": {
            "uri": "./js/react.js",
            "type": "js",
            "pkg": "p0"
        },
        "static/js/reflux.js": {
            "uri": "./js/reflux.js",
            "type": "js",
            "pkg": "p0"
        },
        "static/js/touch.js": {
            "uri": "./js/touch.js",
            "type": "js"
        },
        "static/js/zepto.js": {
            "uri": "./js/zepto.js",
            "type": "js",
            "pkg": "p1"
        },
        "widget/m2/css/m12222.css": {
            "uri": "./css/m12222.css",
            "type": "css"
        },
        "widget/m2/css/m2.less": {
            "uri": "./css/m2.css",
            "type": "css"
        },
        "widget/m2/js/m2.js": {
            "uri": "./js/m2.js",
            "type": "js"
        },
        "widget/m2/mod2.html": {
            "uri": "/widget/m2/mod2.html",
            "type": "html"
        }
    },
    "pkg": {
        "p0": {
            "uri": "/js/react.js",
            "type": "js",
            "has": [
                "static/js/react-dom.js",
                "static/js/react.js",
                "static/js/reflux.js"
            ]
        },
        "p1": {
            "uri": "/js/zepto.js",
            "type": "js",
            "has": [
                "static/js/zepto.js"
            ]
        }
    }
};