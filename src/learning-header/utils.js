/*-----------------------------------------------------------------------------
 written by: Lawrence McDaniel - https://lawrencemcdaniel.com
 date: nov-2024

 usage: utility functions to fetch and cache MFE json dict config
        and misc attribute data from openedx MFE_CONFIG rest api.
-----------------------------------------------------------------------------*/
const { getConfig } = require('@edx/frontend-platform');

// generic utility function to fetch and cache MFE json dict config from openedx rest api.
let cachedMFEConfig = null;
const getMfeConfig = () => {
  if (cachedMFEConfig !== null) {
    return cachedMFEConfig;
  }

  const url = getConfig().MFE_CONFIG_API_URL;
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // false makes the request synchronous
    xhr.send(null);

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      cachedMFEConfig = data;
    } else {
      console.error('Error fetching the URL:', xhr.statusText);
      cachedMFEConfig = null;
    }
  } catch (error) {
    console.error('Error fetching the URL:', error);
    cachedMFEConfig = null;
  }

  console.log('caching MFE_CONFIG:', cachedMFEConfig);
  return cachedMFEConfig;
};

// Generic fetcher function
function fetchFromMfeConfig(key) {
  if (mfe_config.hasOwnProperty(key)) {
    return mfe_config[key];
  } else {
    throw new Error(`Key "${key}" not found in mfe_config`);
  }
}

// generic utility function to fetch and cache firebase config from MFE json dict config.
let cachedFirebaseConfig = null;
const getFirebaseConfig = () => {
  if (cachedFirebaseConfig !== null) {
    return cachedFirebaseConfig;
  }

  try {
    cachedFirebaseConfig = fetchFromMfeConfig('TTBPLUGIN_GOOGLE_FIREBASE_CONFIG_JSON');
    console.info('caching config:', cachedFirebaseConfig);
  } catch (error) {
    console.warn('frontend-component-header WARNING:', error.message);
  }

  return cachedFirebaseConfig;
};

// generic utility function to fetch and cache toastr custom css url from MFE json dict config.
let cachedToastrCSSUrl = null;
const getToastrCSSUrl = () => {
  if (cachedToastrCSSUrl !== null) {
    return cachedToastrCSSUrl;
  }

  try {
    cachedToastrCSSUrl = fetchFromMfeConfig('TOASTR_CUSTOM_CSS_URL');
    console.info('caching config:', cachedToastrCSSUrl);
  } catch (error) {
    console.warn('frontend-component-header WARNING:', error.message);
  }

  return cachedToastrCSSUrl;
};

export { getMfeConfig, getFirebaseConfig, getToastrCSSUrl };