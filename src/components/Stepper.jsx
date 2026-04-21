import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import '../assets/css/Stepper.css';

export default function Stepper({
  children,
  initialStep = 1,
  currentStep: propStep,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onClose = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Prev',
  nextButtonText = 'Continue',
  disableStepIndicators = true,
  ...rest
}) {
  const [internalStep, setInternalStep] = useState(initialStep);
  const currentStep = propStep !== undefined ? propStep : internalStep;
  const [prevStep, setPrevStep] = useState(currentStep);
  const [direction, setDirection] = useState(0);

  // Sync direction when currentStep changes
  React.useEffect(() => {
    if (currentStep !== prevStep) {
      setDirection(currentStep > prevStep ? 1 : -1);
      setPrevStep(currentStep);
    }
  }, [currentStep, prevStep]);

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    if (propStep === undefined) {
      setInternalStep(newStep);
    }
    onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (propStep === undefined) setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      if (propStep === undefined) setDirection(1);
      updateStep(currentStep + 1);
    } else {
      onFinalStepCompleted();
    }
  };

  const currentStepChild = stepsArray[currentStep - 1];

  return (
    <div className={`outer-container ${rest.className || ''}`} {...rest}>
      <div className={`step-circle-container ${stepCircleContainerClassName}`}>
        
        {/* Top Navigation Header */}
        <div className="stepper-header">
          {currentStep > 1 && !isCompleted ? (
            <button className="stepper-header-btn back" onClick={handleBack} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          ) : <div className="spacer" />}

          <button className="stepper-header-btn close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5L5 15M5 5L15 15"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar Container */}
        <div className={`step-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            return (
              <StepIndicator
                key={stepNumber}
                step={stepNumber}
                disableStepIndicators={disableStepIndicators}
                currentStep={currentStep}
              />
            );
          })}
        </div>

        {/* Content Container */}
        <div className={`step-content-default ${contentClassName}`} style={{ position: 'relative' }}>
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            >
              {currentStepChild}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Container */}
        {!isCompleted && currentStep !== totalSteps && (
          <div className={`footer-container ${footerClassName}`}>
            <div className={`footer-nav`}>
              <button 
                onClick={handleNext} 
                className="next-button" 
                {...nextButtonProps}
              >
                {nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const stepVariants = {
  initial: dir => ({
    x: dir >= 0 ? 20 : -20,
    opacity: 0,
    filter: 'blur(10px)'
  }),
  animate: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: dir => ({
    x: dir >= 0 ? -20 : 20,
    opacity: 0,
    filter: 'blur(10px)'
  })
};

export function Step({ children, className = '' }) {
  return (
    <div className={`step-default ${className}`}>
      {children}
    </div>
  );
}

function StepIndicator({ step, currentStep, disableStepIndicators }) {
  const status = currentStep === step ? 'active' : currentStep > step ? 'complete' : 'inactive';

  return (
    <div className="step-indicator" data-status={status}>
      <div className="step-indicator-inner" />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, type: 'tween', ease: 'easeOut', duration: 0.4 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
