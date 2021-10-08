import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ViewerApp from './ViewerApp';

const AppLoader = () => {
  const [env, setEnv] = useState<any | null>(null);

  useEffect(() => {
    if (!env) {
      (async () => {
        setEnv((await axios.get('/env.json')).data);
      })();
    }
  }, env);

  if (env) {
    return env.localTemplate
      ? (
        <ViewerApp
          localTemplate={true}
          manifestUrl={env.manifestLocalUrl}
          manifestPath={env.manifestPath}
          templateDir={env.templateDir}
          facebookModelUrl={env.facebookModelUrl}
          twitterModelUrl={env.twitterModelUrl}
        />
      )
      : (
        <ViewerApp
          localTemplate={false}
          manifestUrl={env.manifestOriginalUrl}
          facebookModelUrl={env.facebookModelUrl}
          twitterModelUrl={env.twitterModelUrl}
        />
      );
  } else {
    return (
      <div>Loading...</div>
    );
  }
};

export default AppLoader;
