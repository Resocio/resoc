import React, { useEffect, useState } from 'react'
import { Alert, Card } from 'react-bootstrap';
import { demoParamValues, ImageTemplate, loadRemoteTemplate, ParamValues, TemplateParam } from '@resoc/core';
import TemplatePresentation from './TemplatePresentation';
import LocalStarterAlert from './alerts/LocalStarterAlert';
import { waitForUpdates } from './Utils';
import CreateImage from './create/CreateImage';

export type TemplateAppProps = {
  localTemplate: boolean;
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
    if (props.localTemplate && !updateListenerStarted) {
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

      {props.localTemplate && (
        <LocalStarterAlert
          templateDir={props.templateDir}
          manifestPath={props.manifestPath}
        />
      )}

      {template && parametersAndValues && (
        <>
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

          {props.localTemplate && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                  Create an image
                </Card.Title>
                <CreateImage
                  parameters={parametersAndValues.parameters}
                  values={parametersAndValues.values}
                  manifestPath={props.manifestPath}
                />
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TemplateApp;
