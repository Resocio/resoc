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

type ParametersAndValues = {
  parameters: TemplateParam[];
  values: ParamValues;
}

const TemplateApp = (props: TemplateAppProps) => {
  const [template, setTemplate] = useState<ImageTemplate | null>(null);
  const [parametersAndValues, setParametersAndValues] = useState<ParametersAndValues | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [updateListenerStarted, setUpdateListenerStarted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!template) {
        try {
          const newTemplate = await loadRemoteTemplate(props.manifestUrl);
          setTemplate(newTemplate);
          if (
            !parametersAndValues?.parameters ||
            JSON.stringify(newTemplate.parameters) !== JSON.stringify(parametersAndValues.parameters)
          ) {
            setParametersAndValues({
              parameters: newTemplate.parameters,
              values: demoParamValues(newTemplate.parameters)
            });
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

      {template && parametersAndValues && (
        <TemplatePresentation
          template={template}
          parameters={parametersAndValues.parameters}
          values={parametersAndValues.values}
          manifestPath={props.manifestPath}
          onChange={(newValues) => {
            setParametersAndValues({
              parameters: parametersAndValues.parameters,
              values: newValues
            });
          }}
          facebookModelUrl={props.facebookModelUrl}
          twitterModelUrl={props.twitterModelUrl}
        />
      )}
    </div>
  );
};

export default TemplateApp;
