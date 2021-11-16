export {
  DefaultManifestName,
  renderTemplateToHtml,
  demoParamValues,
  paramLabel,
  validateParamValue,
  stringToParamValue,
  paramValueToString,
  getImageSpecs,
  FacebookOpenGraph,
  TwitterCard,
  ParamType
} from "./template";

export { loadRemoteTemplate, isAbsoluteUrl } from "./remote";

export type {
  ImageTemplate,
  ParamValue,
  ParamValues,
  TemplateParam,
  ImageResolution
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
  ImageDestination,
  TwitterBannerDestination,
  WebPageSocialImageDestination
} from './image-specs'
