import { default as IAction } from "./Action";
import { default as ILocation } from "./Location";
import { default as IOSMFeature } from "./OSMFeature";
import { default as IPOI } from "./POI";

export type Action<T> = IAction<T>;
export type Location = ILocation;
export type OSMFeature = IOSMFeature;
export type POI = IPOI;
