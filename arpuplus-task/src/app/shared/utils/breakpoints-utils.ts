export function getBreakpointValue(
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
): number {
  const value = Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      `--bs-breakpoint-${breakpoint}`,
    ),
  );
  return value;
}
