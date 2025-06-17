import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';



fetch('/assets/config.json')
  .then(response => response.json())
  .then(config => {
    environment.baseApiUrl = config.apiUrl;
    console.log("baseUrl : ",config.apiUrl);

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
