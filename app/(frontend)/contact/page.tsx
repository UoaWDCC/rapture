import React from 'react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* 
        This is a temporary container to help visualize the ContactForm. 
        In the future, this will be wrapped by the coloured file tab component.
      */}
      <ContactForm />
    </div>
  );
}
