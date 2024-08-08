export interface HeaderNavItem {
  name: string;
  url: string;
  fragment?: string;
  queryParam?: string;
  // In case url is in other page section with scrolling, true url should be set
  trueUrl?: string;
  className?: string;
}
