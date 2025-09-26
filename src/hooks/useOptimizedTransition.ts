import { useCallback } from 'react';

interface TransitionConfig {
  duration?: number;
  easing?: string;
  transform?: string;
}

export const useOptimizedTransition = () => {
  const createTransition = useCallback((config: TransitionConfig = {}) => {
    const {
      duration = 300,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      transform = 'transform'
    } = config;

    return {
      transition: `${transform} ${duration}ms ${easing}`,
      willChange: transform,
    };
  }, []);

  const buttonHover = createTransition({ transform: 'transform, box-shadow' });
  const cardHover = createTransition({ transform: 'transform, box-shadow', duration: 200 });
  const pageTransition = createTransition({ duration: 700 });

  return {
    buttonHover,
    cardHover,
    pageTransition,
    createTransition
  };
};