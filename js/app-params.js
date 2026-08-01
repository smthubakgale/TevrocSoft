const storage = window.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
 
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('base44_access_token');
		storage.removeItem('tevroc_access_token');
		storage.removeItem('token');
	}
	const token = getAppParamValue("access_token", { removeFromUrl: true })
		|| storage.getItem('tevroc_access_token')
		|| storage.getItem('token');
	return { 
		token,
		fromUrl: getAppParamValue("from_url", { 
            defaultValue: window.location.href 
        }),
		functionsVersion: getAppParamValue("functions_version", { 
            defaultValue: "1.0.0"
        }),
		appBaseUrl: getAppParamValue("app_base_url", {
			defaultValue: "https://tevrocsoftapi.netlify.app",
        }),
		apiBaseUrl: getAppParamValue("api_base_url", {
			defaultValue: "https://tevroc-worker.smthubakgale2290.workers.dev",
		}),
		serviceUrl: getAppParamValue("service_url", {
			defaultValue: "https://tevrocsoftapi.netlify.app",
		}),
		appId: getAppParamValue("app_id", { 
			defaultValue: "tevrocdev",
		}),
		appName: getAppParamValue("app_name", { 
			defaultValue: "TevrocDev",
		}),
		payAccount: getAppParamValue("pay_account", { 
			defaultValue: "TevrocDev"
		})
	}
}

console.log(getAppParams())

window.appParams = {
	...getAppParams()
}