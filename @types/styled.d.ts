import theme from '../src/theme/default';

declare module 'styled-components/native' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}
