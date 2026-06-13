import { useState } from 'react';
import { m } from 'framer-motion';
import { X } from 'lucide-react';


interface ContactModalProps {
  playClick: () => void;
  playType: () => void;
  onClose: () => void;
}

export function ContactModal({ playClick, playType, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/mykvblzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <m.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[22px] p-8 md:p-10 relative shadow-2xl flex flex-col gap-8 [will-change:transform]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Icon */}
        <button 
          onClick={() => {
            playClick();
            onClose();
          }}
          onMouseEnter={playType}
          className="absolute top-6 right-6 p-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={13} />
        </button>

        {formStatus === 'success' ? (
          <div className="flex flex-col items-start text-left py-6 gap-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] block">
              Success
            </span>
            <h3 className="font-serif text-3xl font-light text-[var(--text-primary)] m-0 leading-tight">
              Message Sent.
            </h3>
            <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              Thank you for reaching out. Your message has been received, and I will get back to you shortly.
            </p>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playType}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300 cursor-pointer pt-2"
            >
              <span>Close Window</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] block mb-1">
                Contact
              </span>
              <h2 className="font-serif text-3xl font-light tracking-tight text-[var(--text-primary)] m-0">
                Get in touch
              </h2>
            </div>

            {/* Minimalist Form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 text-left">
              {/* Name field */}
              <div className="flex flex-col">
                <label htmlFor="form-name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  onMouseEnter={playType}
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] placeholder-zinc-500 font-sans transition-colors duration-300"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col">
                <label htmlFor="form-email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  onMouseEnter={playType}
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] placeholder-zinc-500 font-sans transition-colors duration-300"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label htmlFor="form-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleFormChange}
                  onMouseEnter={playType}
                  placeholder="Your Message"
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] placeholder-zinc-500 font-sans transition-colors duration-300 min-h-[80px] resize-y leading-relaxed"
                />
              </div>

              {formStatus === 'error' && (
                <p className="text-red-500 font-sans text-xs m-0 pt-1">
                  Failed to send. Please try again.
                </p>
              )}

              {/* Minimal Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  onMouseEnter={playType}
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {formStatus === 'submitting' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </m.div>
    </div>
  );
}
