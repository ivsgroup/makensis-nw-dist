"use strict";

const fs     = require('fs');
const path   = require('path');
const util   = require('util');
const cp     = require('child_process');

const passthru = require('nyks/child_process/passthru');


module.exports = function(root_path, skin, chain){

    if(!fs.existsSync(root_path))
      chain("wd src_output_dir do not exists");

    var pack       =  require(path.resolve(root_path ,'app', 'package.json'));
    var spPath      = path.join(path.resolve(__dirname) , 'sp.nsi');


    var args = ["/NOCD", "/V4", spPath];

    var env = Object.assign({}, process.env);


    env.PACKAGE_VERSION = pack.version;
    env.PACKAGE_VERSION_CLEAN = "0.0.0.0";
    env.PACKAGE_NAME    = pack.name;
    env.PACKAGE_NAME_WITH_SYMBOL = pack.name;
    env.COMPANY_NAME   = pack.company;
    env.APP_URL = pack.app_url;

    env.ROOT_PATH  = path.resolve(root_path);

    Object.assign(env, skin);

    env.OUTFILE = process.env.OUTFILE || util.format("%s/%s-%s-Setup.exe", root_path, pack.name, pack.version);
        //generate this BMP 24b with paint (gimp compat mode)

    passthru("makensis", {args:args, env: env}, chain);
}
