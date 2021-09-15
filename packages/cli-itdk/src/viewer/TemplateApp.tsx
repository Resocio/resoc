import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { demoParamValues, ImageTemplate, loadRemoteTemplate, ParamValues, TemplateParam } from '@resoc/core';
import TemplatePresentation from './TemplatePresentation';
import StarterAlert from './StarterAlert';
import { waitForUpdates } from './Utils';

export type TemplateAppProps = {
  manifestUrl: string;
  templateDir: string;
  manifestPath: string;
  facebookModelUrl?: string;
  twitterModelUrl?: string;
};

const TemplateApp = (props: TemplateAppProps) => {
  const [template, setTemplate] = useState<ImageTemplate | null>(null);
  const [parameters, setParameters] = useState<TemplateParam[] | null>(null);
  const [values, setValues] = useState<ParamValues | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [updateListenerStarted, setUpdateListenerStarted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!template) {
        try {
          const newTemplate = await loadRemoteTemplate(props.manifestUrl);
          setTemplate(newTemplate);
          if (
            !parameters ||
            JSON.stringify(newTemplate.parameters) !== JSON.stringify(parameters)
          ) {
            setParameters(newTemplate.parameters);
            setValues(demoParamValues(newTemplate.parameters));
          }
        }
        catch(e) {
          setError(e);
        }
      }
    })();
  }, [props.manifestUrl, template]);

  useEffect(() => {
    if (!updateListenerStarted) {
      setUpdateListenerStarted(true);
      waitForUpdates(() => {
        // Force reload
        setTemplate(null);
      });
    }
  });

  return (
    <div>
      {error && (
        <Alert variant="danger">
          <p>
            <strong>{error.message}</strong>
          </p>
        </Alert>
      )}

      <StarterAlert
        templateDir={props.templateDir}
        manifestPath={props.manifestPath}
      />

      {template && parameters && values && (
        <TemplatePresentation
          template={template}
          parameters={parameters}
          values={values}
          manifestPath={props.manifestPath}
          onChange={(newValues) => {
            setValues(newValues);
          }}
          facebookModelUrl={props.facebookModelUrl}
          twitterModelUrl={props.twitterModelUrl}
        />
      )}
    </div>
  );
};

export default TemplateApp;
