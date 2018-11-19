import _ from 'lodash';
import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from "@fortawesome/fontawesome-free/js/all.js";

import './assets/css/style.css';
import './assets/js/indexPage';

import './assets/js/service-worker';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js').then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}

console.log(process.env.NODE_ENV);
