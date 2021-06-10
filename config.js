// keep this comment
try {
  let Xdb = Cu.import('resource://gre/modules/addons/XPIDatabase.jsm', {});
  Xdb.XPIDatabase.isDisabledLegacy = (addon) => false;
  Xdb.AddonSettings = {
    ...Object.fromEntries(Object.getOwnPropertyNames(Xdb.AddonSettings)
      .map(e => [e, Xdb.AddonSettings[e]])),
    "REQUIRE_SIGNING": false,
    "LANGPACKS_REQUIRE_SIGNING": false,
    "ALLOW_LEGACY_EXTENSIONS": true, // <=fx73
    "EXPERIMENTS_ENABLED": true, // >=fx74
  };

  const {FileUtils} = Cu.import('resource://gre/modules/FileUtils.jsm');
  Components.manager.QueryInterface(Ci.nsIComponentRegistrar)
    .autoRegister(FileUtils.getFile('GreD', ['legacy.manifest']));

  const {AddonManager} = Cu.import('resource://gre/modules/AddonManager.jsm');
  const {BootstrapLoader} = Cu.import('resource://legacy/BootstrapLoader.jsm');
  AddonManager.addExternalExtensionLoader(BootstrapLoader);

  const {Services} = Cu.import('resource://gre/modules/Services.jsm');
  Services.prefs.setBoolPref('xpinstall.signatures.required', false);
} catch(ex) {
  Components.utils.reportError(ex.message);
}

try {
  
  let {
  classes: Cc,
  interfaces: Ci,
  manager: Cm,
  utils: Cu
  } = Components;
  
  let cmanifest = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('UChrm', Ci.nsIFile);
  cmanifest.append('utils');
  cmanifest.append('chrome.manifest');
  
  if(cmanifest.exists()){
    Cm.QueryInterface(Ci.nsIComponentRegistrar).autoRegister(cmanifest);
    Cu.import('chrome://userchromejs/content/boot.jsm');
  }

} catch(ex) {};
