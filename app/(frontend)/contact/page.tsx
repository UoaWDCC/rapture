import React from 'react';
import ContactForm from '../components/ContactForm';
import GlitchReveal from '../components/GlitchReveal';

export default function ContactPage() {
  return (
    <section className="min-h-screen flex justify-center px-4 py-10">
      <GlitchReveal className="w-full max-w-220">
        <div className="bg-[#070d0d] border-2 border-brand-blue shadow-[0_0_20px_1px_#0650DA60] px-4 pb-8 md:px-10">
          <ContactForm />
        </div>
      </GlitchReveal>
    </section>
  );
}
