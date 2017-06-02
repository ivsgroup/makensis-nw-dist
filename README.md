
# Motivation
This is a makensis based (very simple) alternative to [nw-builder](https://github.com/nwjs-community/nw-builder)


[![Version](https://img.shields.io/npm/v/makensis-nw-dist.svg)](https://www.npmjs.com/package/makensis-nw-dist)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)


# Executable name
Node webkit executable (nw.exe) must be named "as it" since renaming it break natives modules
See https://github.com/nwjs/nw.js/issues/199




# API

```
    process.env.OUTFILE = grunt.config('setup_path');
    var done = this.async();

    var root_path = "release";
      release/app/package.json (your nw app)
      release/app/node-webkit/nw.exe  (your nw exe path - see [nwjs-binaries](https://www.npmjs.com/package/nwjs-binaries) )

    makensis(root_path, { 
      MUI_ICON : path.join(root_path, "app/skin/logo.ico"),
      MUI_UI_HEADERIMAGE_RIGHT : path.join(root_path, "app/skin/logo_256.png"),
      MUI_WELCOMEFINISHPAGE_BITMAP : path.join(root_path, "app/skin/installer-image.bmp"),
      MUI_PAGE_LICENSE : path.join(root_path, "app/LICENSE"),
    }, done);
```


# Credits
* [131](https://github.com/131)

