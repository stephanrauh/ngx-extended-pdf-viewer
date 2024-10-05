import { Content } from './content.types';

export type RouteData = {
  pageTitle: string;
  content: Content[];
};

export type RouteGroupData = {
  key: string;
  name: string;
};
