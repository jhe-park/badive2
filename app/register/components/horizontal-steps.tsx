'use client';

import { cn } from '@heroui/react';
import { useControlledState } from '@react-stately/utils';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import React from 'react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

type ColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

interface HorizontalStepsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  steps?: Step[];
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  currentStep?: number;
  hideProgressBars?: boolean;
  stepClassName?: string;
  className?: string;
}

const HorizontalSteps = React.forwardRef<HTMLButtonElement, HorizontalStepsProps>(
  (
    {
      color = 'primary',
      steps = [],
      defaultStep = 0,
      onStepChange,
      currentStep: currentStepProp,
      hideProgressBars = false,
      stepClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useControlledState(currentStepProp, defaultStep, onStepChange);

    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        '[--active-fg-color:hsl(var(--step-fg-color))]',
        '[--active-border-color:hsl(var(--step-color))]',
        '[--active-color:hsl(var(--step-color))]',
        '[--complete-background-color:hsl(var(--step-color))]',
        '[--complete-border-color:hsl(var(--step-color))]',
        '[--inactive-border-color:hsl(var(--heroui-default-300))]',
        '[--inactive-color:hsl(var(--heroui-default-300))]',
      ];

      switch (color) {
        case 'primary':
          userColor = '[--step-color:var(--heroui-primary)]';
          fgColor = '[--step-fg-color:var(--heroui-primary-foreground)]';
          break;
        case 'secondary':
          userColor = '[--step-color:var(--heroui-secondary)]';
          fgColor = '[--step-fg-color:var(--heroui-secondary-foreground)]';
          break;
        case 'success':
          userColor = '[--step-color:var(--heroui-success)]';
          fgColor = '[--step-fg-color:var(--heroui-success-foreground)]';
          break;
        case 'warning':
          userColor = '[--step-color:var(--heroui-warning)]';
          fgColor = '[--step-fg-color:var(--heroui-warning-foreground)]';
          break;
        case 'danger':
          userColor = '[--step-color:var(--heroui-error)]';
          fgColor = '[--step-fg-color:var(--heroui-error-foreground)]';
          break;
        case 'default':
          userColor = '[--step-color:var(--heroui-default)]';
          fgColor = '[--step-fg-color:var(--heroui-default-foreground)]';
          break;
        default:
          userColor = '[--step-color:var(--heroui-primary)]';
          fgColor = '[--step-fg-color:var(--heroui-primary-foreground)]';
          break;
      }

      colorsVars.unshift(fgColor);
      colorsVars.unshift(userColor);

      return colorsVars;
    }, [color]);

    return (
      <nav aria-label="Progress" className="flex w-full justify-center md:justify-evenly">
        <ol className={cn('flex w-[90%] flex-row justify-between md:w-2/3', colors, className)}>
          {steps?.map((step, stepIdx) => {
            let status = currentStep === stepIdx ? 'active' : currentStep < stepIdx ? 'inactive' : 'complete';

            return (
              <li key={stepIdx} className="relative flex w-full max-w-[120px] items-center">
                <button
                  key={stepIdx}
                  ref={ref}
                  aria-current={status === 'active' ? 'step' : undefined}
                  className={cn('group flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-large py-2.5', stepClassName)}
                  onClick={() => setCurrentStep(stepIdx)}
                  {...props}
                >
                  <div className="h-ful relative flex items-center">
                    <LazyMotion features={domAnimation}>
                      <m.div
                        animate={status}
                        className={cn('relative', {
                          'text-blue-500': currentStep >= stepIdx,
                        })}
                      >
                        {step.icon}
                      </m.div>
                    </LazyMotion>
                    {stepIdx < steps.length - 1 && !hideProgressBars && (
                      <div
                        aria-hidden="true"
                        className={cn(
                          'pointer-events-none absolute left-6 top-1/2 flex w-[10vw] -translate-y-1/2 translate-x-1/2 items-center sm:w-12 md:w-[15vw]',
                        )}
                        style={{
                          // @ts-ignore
                          '--idx': stepIdx,
                        }}
                      >
                        <div
                          className={cn(
                            'relative h-0.5 w-full bg-default-200 transition-colors duration-300',
                            "after:absolute after:block after:h-full after:w-0 after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-['']",
                            {
                              'after:w-full': stepIdx < currentStep,
                            },
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="max-w-[100px] flex-1 px-2 text-center lg:max-w-[120px]">
                    <div
                      className={cn('text-xs', {
                        'font-bold text-blue-500': currentStep >= stepIdx,
                        'text-gray-500': currentStep < stepIdx,
                      })}
                    >
                      {step.title}
                    </div>
                    <div
                      className={cn('text-xs', {
                        'font-bold text-blue-500': currentStep >= stepIdx,
                        'text-gray-500': currentStep < stepIdx,
                      })}
                    >
                      {step.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

HorizontalSteps.displayName = 'HorizontalSteps';

export default HorizontalSteps;
