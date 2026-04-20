import React, { useState } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import Stepper, { Step } from './Stepper';

const premiumFadeIn = {
  initial: { opacity: 0, y: 15, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, filter: 'blur(10px)', transition: { duration: 0.3 } }
};

export default function ContactStepper({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isStepValid = () => {
    if (activeStep === 1) return formData.name.trim().length >= 2;
    if (activeStep === 2) return emailRegex.test(formData.email);
    if (activeStep === 3) return formData.message.trim().length >= 5;
    return true; // Success step
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasSent = React.useRef(false);

  const handleFinalSubmit = React.useCallback(() => {
    if (hasSent.current) return;
    hasSent.current = true;
    setIsSending(true);
    setSendError(null);

    const serviceId = 'service_r5yy1d7';
    const templateId = 'template_v6ksm2i';
    const publicKey = 'kFYH_oh7eseTb5uzI';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Ebin'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSending(false);
      }, (err) => {
        console.error('FAILED...', err);
        setSendError('Failed to send message. Please try again later.');
        setIsSending(false);
      });
  }, [formData]);

  React.useEffect(() => {
    if (activeStep === 4) {
      handleFinalSubmit();
    }
  }, [activeStep, handleFinalSubmit]);

  if (!isOpen) return null;

  return (
    <div className="stepper-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="stepper-modal outer-container">
        <Stepper 
          onFinalStepCompleted={handleFinalSubmit}
          onStepChange={setActiveStep}
          onClose={onClose}
          nextButtonText={isSending ? 'Sending...' : 'Continue'}
          backButtonText="Prev"
          nextButtonProps={{ disabled: !isStepValid() || isSending }}
        >
          {/* Step 1: Introduction */}
          <Step>
            <motion.h2 variants={premiumFadeIn}>Let’s start with <br/> your name</motion.h2>
            <motion.p variants={premiumFadeIn}>I’d love to know who I’m talking to. Please introduce yourself.</motion.p>
            <motion.div className="step-form-group" variants={premiumFadeIn}>
              <input 
                type="text" 
                name="name"
                className="step-form-input" 
                placeholder="Type your name here..." 
                value={formData.name}
                onChange={handleChange}
                autoFocus
                autoComplete="off"
              />
            </motion.div>
          </Step>

          {/* Step 2: Email */}
          <Step>
            <motion.h2 variants={premiumFadeIn}>Nice to meet you, <span style={{ color: 'var(--step-orange)' }}>{formData.name || 'friend'}</span>!</motion.h2>
            <motion.p variants={premiumFadeIn}>Where can I reach you back? I promise no spam, just meaningful conversation.</motion.p>
            <motion.div className="step-form-group" variants={premiumFadeIn}>
              <input 
                type="email" 
                name="email"
                className="step-form-input" 
                placeholder="yourname@example.com" 
                value={formData.email}
                onChange={handleChange}
                autoFocus
                autoComplete="off"
              />
            </motion.div>
          </Step>

          {/* Step 3: Message */}
          <Step>
            <motion.h2 variants={premiumFadeIn}>What’s on <br/> your mind?</motion.h2>
            <motion.p variants={premiumFadeIn}>Tell me about your project, your idea, or just drop a friendly hello.</motion.p>
            <motion.div className="step-form-group" variants={premiumFadeIn}>
              <textarea 
                name="message"
                className="step-form-textarea" 
                placeholder="I’m all ears..." 
                value={formData.message}
                onChange={handleChange}
                autoFocus
              />
              {sendError && <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '1rem' }}>{sendError}</p>}
            </motion.div>
          </Step>

          {/* Step 4: Success/Error States */}
          <Step>
            <div className="step-success">
              {isSending ? (
                <>
                  <motion.div className="success-icon-wrap sending" variants={premiumFadeIn}>
                     <div className="sending-spinner" /> 
                  </motion.div>
                  <motion.h2 variants={premiumFadeIn}>Sending...</motion.h2>
                  <motion.p variants={premiumFadeIn}>Please wait a moment while I <br/> deliver your message.</motion.p>
                </>
              ) : sendError ? (
                <>
                  <motion.div className="success-icon-wrap error" variants={premiumFadeIn}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.div>
                  <motion.h2 variants={premiumFadeIn}>Oops!</motion.h2>
                  <motion.p variants={premiumFadeIn} style={{ color: '#ef4444', fontWeight: 500 }}>{sendError}</motion.p>
                  <motion.button 
                    className="next-button" 
                    style={{ width: '100%', marginTop: '2rem' }} 
                    onClick={() => {
                      hasSent.current = false;
                      setActiveStep(3);
                    }}
                    variants={premiumFadeIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go Back & Retry
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div className="success-icon-wrap" variants={premiumFadeIn}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </motion.div>
                  <motion.h2 variants={premiumFadeIn}>Message Sent</motion.h2>
                  <motion.p variants={premiumFadeIn}>Thanks for reaching out, {formData.name || 'friend'}! <br/> I'll get back to you shortly.</motion.p>
                  <motion.button 
                    className="next-button" 
                    style={{ width: '100%', marginTop: '2rem' }} 
                    onClick={onClose}
                    variants={premiumFadeIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Done
                  </motion.button>
                </>
              )}
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}




