"use strict";

var fs     = require('fs');
var path   = require('path');
var util   = require('util');
var cp     = require('child_process');

var passthru = require('nyks/child_process/passthru');


module.exports = function(wd , chain){

    if(!fs.existsSync(wd))
      chain("wd src_output_dir do not exists");

    var pack = require(path.resolve(wd, 'package.json'));

      //prepare makensis env

    var spPath      = path.join(path.resolve(__dirname) , 'sp.nsi');


    var args = ["/NOCD", "/V4", spPath];
    var env = { };

    var root_path = wd;

    env.PACKAGE_VERSION = pack.version;
    env.PACKAGE_VERSION_CLEAN = "0.0.0.0";
    env.PACKAGE_NAME    = pack.name;
    env.PACKAGE_NAME_WITH_SYMBOL = pack.name;
    env.COMPANY_NAME   = pack.company;
    env.APP_URL = pack.app_url;

    env.ROOT_PATH  = path.resolve(root_path);
    env.MUI_ICON                 = path.join(env.ROOT_PATH, pack.skins.MUI_ICON);
    env.MUI_UI_HEADERIMAGE_RIGHT = path.join(env.ROOT_PATH, pack.skins.MUI_UI_HEADERIMAGE_RIGHT);
    env.MUI_PAGE_LICENSE         = path.join(env.ROOT_PATH, pack.skins.MUI_PAGE_LICENSE);
    env.MUI_WELCOMEFINISHPAGE_BITMAP = path.join(env.ROOT_PATH, pack.skins.MUI_WELCOMEFINISHPAGE_BITMAP);

    env.OUTFILE = process.env.OUTFILE || util.format("%s/%s-%s-Setup.exe", wd, pack.name, pack.version);
        //generate this BMP 24b with paint (gimp compat mode)

    passthru("makensis", {args:args, env: env}, chain);
}
