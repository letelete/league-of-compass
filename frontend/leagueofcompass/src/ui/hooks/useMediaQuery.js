import { useMediaQuery } from 'react-responsive';

export const useLargeScreenMediaQuery = () => useMediaQuery({ minWidth: 1301 });

export const useSmallScreenMediaQuery = () => useMediaQuery({ maxWidth: 1300 });

export const useMobileMediaQuery = () => useMediaQuery({ maxWidth: 600 });
