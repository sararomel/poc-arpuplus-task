import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  startWith,
} from 'rxjs';

export function isMobile(): boolean {
  const isMobile = window.matchMedia(
    `only screen and (max-width: 480px)`,
  ).matches;
  return isMobile;
}

export function mediaMax(maxWidth = 480): Observable<boolean> {
  return fromEvent(window, 'resize').pipe(
    startWith(() => window.innerWidth),
    debounceTime(100),
    distinctUntilChanged(),
    map(() => window.innerWidth),
    map((width) => width < maxWidth),
  );
}

export function mediaMin(minWidth = 480): Observable<boolean> {
  return fromEvent(window, 'resize').pipe(
    startWith(() => window.innerWidth),
    debounceTime(100),
    distinctUntilChanged(),
    map(() => window.innerWidth),
    map((width) => width > minWidth),
  );
}
