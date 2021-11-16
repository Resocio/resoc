export {
  FacebookOpenGraph,
  TwitterCard
} from './resolution';

export type {
  ImageResolution
} from "./resolution";

export {
  DefaultManifestName,
  renderTemplateToHtml,
  demoParamValues,
  paramLabel,
  validateParamValue,
  stringToParamValue,
  paramValueToString,
  getImageSpecs,
  ParamType
} from "./template";

export { loadRemoteTemplate, isAbsoluteUrl } from "./remote";

export type {
  ImageTemplate,
  ParamValue,
  ParamValues,
  TemplateParam,
} from "./template";

export type {
  ImageSpecs
} from './image-specs';

export {
  getImageSpecsByDestination,
  fillImageSpecsViaDestination,
  getImageMaxRatio,
  getImageMinRatio,
  getImageRatio,
  getImageMaxWidth,
  getImageMinWidth,
  getImageWidth,
  getImageMaxHeight,
  getImageMinHeight,
  getImageHeight,
  getImageDemoResolution,
  ImageDestination,
  TwitterBannerDestination,
  WebPageSocialImageDestination
} from './image-specs'
