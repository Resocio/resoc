import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TemplateApp from './TemplateApp';

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
    return (
      <TemplateApp
        localTemplate={env.localTemplate}
        manifestUrl={`/${env.manifestName}`}
        manifestPath={env.manifestPath}
        templateDir={env.templateDir}
        facebookModelUrl={env.facebookModelUrl}
        twitterModelUrl={env.twitterModelUrl}
      />
    )
  } else {
    return (
      <div>Loading...</div>
    );
  }
};

export default AppLoader;
