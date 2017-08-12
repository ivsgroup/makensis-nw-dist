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

    args.push('/DPACKAGE_VERSION=' + pack.version);
    args.push('/DPACKAGE_VERSION_CLEAN=0.0.0.0');
    args.push('/DPACKAGE_NAME=' + pack.name);
    args.push('/DPACKAGE_NAME_WITH_SYMBOL=' + pack.name);
    args.push('/DCOMPANY_NAME=' + pack.company);
    args.push('/DAPP_URL=' + pack.app_url);
    args.push('/DROOT_PATH=' + path.resolve(root_path));

    Object.keys(skin).forEach(function(key) {
        args.push('/D'+key + '=' + skin[key]);
    });

    if (process.env.OUTFILE) {
        args.push('/DOUTFILE=' + process.env.OUTFILE)
    } else {
        args.push('/DOUTFILE=' + util.format("%s/%s-%s-Setup.exe", root_path, pack.name, pack.version)):
    }

    args.push(spPath);

        //generate this BMP 24b with paint (gimp compat mode)

    passthru("makensis", {args:args}, chain);
}
