import React from 'react';
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import ContactFormConfirmationToUser from '@/lib/email/email_templates/contactFormConfirmationToUser';
import ContactFormConfirmation from '@/lib/email/email_templates/contactFormConfirmation';

interface ContactFormProps {
  title?: string;
  description?: React.ReactNode;
}

async function submitContactForm(formData: FormData) {
  "use server";

  const firstName = formData.get("firstName") as string; const lastName = formData.get("lastName") as string;
  const name = `${firstName} ${lastName}`;
  const emailValue = formData.get("email"); // as string;
  // console.log("EMAIL:", emailValue);
  const form = formData.get("message") as string;
  const category = formData.get("enquiryCategory") as string;

  if (typeof emailValue !== "string" || !emailValue.trim()) {
    throw new Error("invalid email");
  }

  // USER
  const email = emailValue.trim();
  const htmlToUser = await render(
    <ContactFormConfirmationToUser name={name} form={form} />
  );

  // ADMIN
  const emailAdmin = "dummy@gmail.com"; //admin email
  const htmlToAdmin = await render(
    <ContactFormConfirmation name={name} email={email} form={form} category={category} />
  );

  try {
    await Promise.all([
      sendEmail({
        to: emailAdmin,
        subject: `${name} Reached out.`,
        html: htmlToAdmin,
      }),

      sendEmail({
        to: email,
        subject: "Thank you for reaching out!",
        html: htmlToUser,
      })
    ]);
  } catch (error) {
    throw new Error("Sorry, we couldn't send your message.")
  }
}

export default function ContactForm({
  title = "Contact Us",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis.",

}: ContactFormProps) {
  return (
    <div className='max-w-200 mt-10'>
      <div className='flex flex-col mb-5 gap-5'>
        <h2>{title}</h2>
        <div className="font-fira-custom">{description}</div>
      </div>

      <form action={submitContactForm} autoComplete="off" className='flex flex-col gap-5'>
        {/* Row 1: First and Last Name */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full md:flex-1 gap-2">
            <label
              htmlFor="firstName"
              className="text-xl"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="new-password"
              data-form-type="other"
              data-lpignore="true"
              className="bg-[#0650DA]/10 border-white font-fira-custom text-white outline-none transition-colors h-12 border-1 border-solid px-3 text-md"
              required
            />
          </div>

          <div className="flex flex-col w-full md:flex-1 gap-2">
            <label
              htmlFor="lastName"
              className="text-xl"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="new-password"
              data-form-type="other"
              data-lpignore="true"
              className="bg-[#0650DA]/10 border-white font-fira-custom text-white outline-none transition-colors h-12 border-1 border-solid px-3 text-md"
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="flex flex-col flex-1 gap-2">
          <label
            htmlFor="email"
            className="text-xl"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="new-password"
            data-form-type="other"
            data-lpignore="true"
            className="bg-[#0650DA]/10 border-white font-fira-custom text-white outline-none transition-colors h-12 border-1 border-solid px-3 text-md"
            required
          />
        </div>

        {/* Row 3: Enquiry Category */}
        <div className="flex flex-col flex-1 gap-2">
          <label
            htmlFor="enquiryCategory"
            className="text-xl"
          >
            Enquiry Category
          </label>
          <div className="relative">
            <select
              id="enquiryCategory"
              name="enquiryCategory"
              className="w-full bg-[#0650DA]/10 border-white font-fira-custom text-white outline-none transition-colors appearance-none cursor-pointer h-12 border-1 border-solid rounded-none px-3 text-md"
            >
              <option value="" className="bg-[#0650DA] text-white">Select a category...</option>
              <option value="general" className="bg-[#0650DA] text-white">General Inquiry</option>
              <option value="support" className="bg-[#0650DA] text-white">Support</option>
              <option value="business" className="bg-[#0650DA] text-white">Business</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-3">
              <svg
                className="fill-white w-4 h-4"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Row 4: Message */}
        <div className="flex flex-col flex-1 gap-2">
          <label
            htmlFor="message"
            className="text-xl"
          >
            Message Here
          </label>
          <textarea
            id="message"
            name="message"
            className="bg-[#0650DA]/10 border-white font-fira-custom text-white outline-none transition-colors h-50 resize-none border-1 border-solid p-3 text-md"
            required
          ></textarea>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="text-white border-1 border-solid font-normal flex items-center justify-center w-60 h-15 font-fira-custom text-md cursor-pointer bg-[#0650DA]/10 hover:bg-[#0650DA]/50 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
