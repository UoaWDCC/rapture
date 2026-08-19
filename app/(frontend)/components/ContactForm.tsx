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
    <div className="w-full max-w-[870px] min-w-[320px] ml-95 @container z-0">
      <div className="relative w-full text-white overflow-hidden aspect-[87/98] pt-[9cqw] pl-[14cqw] pr-[8cqw] pb-[12cqw]">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#0650DA]/[0.34] pointer-events-none z-10" />

        {/* Heading */}
        <h2 className="relative z-20 font-nova-custom font-normal text-[5.524cqw] leading-[4.604cqw] tracking-normal">
          {title}
        </h2>

        {/* Description */}
        <div className="relative z-20 font-fira-custom font-normal mt-[1.956cqw] text-[1.611cqw] leading-[1.841cqw] max-w-[68.929cqw] tracking-[-0.01em]">
          {description}
        </div>

        {/* Form */}
        <form 
          className="flex flex-col mt-[4.373cqw]" 
          action={submitContactForm}
          autoComplete="off"
        >
          
          {/* Row 1: First and Last Name */}
          <div className="relative z-20 flex flex-row gap-[4.028cqw]">
            <div className="flex flex-col flex-1 gap-[1.036cqw]">
              <label 
                htmlFor="firstName" 
                className="font-nova-custom font-normal text-[3.222cqw] leading-[2.762cqw] tracking-[-0.01em]"
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
                className="bg-transparent border-white font-fira-custom text-white outline-none transition-colors h-[4.833cqw] border-[0.115cqw] border-solid px-[1.381cqw] text-[1.611cqw]"
                required
              />
            </div>

            <div className="flex flex-col flex-1 gap-[1.036cqw]">
              <label 
                htmlFor="lastName" 
                className="font-nova-custom font-normal text-[3.222cqw] leading-[2.762cqw] tracking-[-0.01em]"
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
                className="bg-transparent border-white font-fira-custom text-white outline-none transition-colors h-[4.833cqw] border-[0.115cqw] border-solid px-[1.381cqw] text-[1.611cqw]"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="relative z-20 flex flex-col gap-[1.266cqw] mt-[3.797cqw] w-[77.676cqw]">
            <label 
              htmlFor="email" 
              className="font-nova-custom font-normal text-[3.222cqw] leading-[2.762cqw] tracking-[-0.01em]"
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
              className="bg-transparent border-white font-fira-custom text-white outline-none transition-colors h-[4.833cqw] border-[0.115cqw] border-solid px-[1.381cqw] text-[1.611cqw]"
              required
            />
          </div>

          {/* Row 3: Enquiry Category */}
          <div className="relative z-20 flex flex-col gap-[1.036cqw] mt-[3.567cqw] w-[46.145cqw]">
            <label 
              htmlFor="enquiryCategory" 
              className="font-nova-custom font-normal text-[3.222cqw] leading-[2.762cqw] tracking-[-0.01em]"
            >
              Enquiry Category
            </label>
            <div className="relative">
              <select 
                id="enquiryCategory" 
                name="enquiryCategory"
                className="w-full bg-transparent border-white font-fira-custom text-white outline-none transition-colors appearance-none cursor-pointer h-[4.833cqw] border-[0.115cqw] border-solid rounded-none px-[1.381cqw] text-[1.611cqw]"
              >
                <option value="" className="bg-[#0650DA] text-white">Select a category...</option>
                <option value="general" className="bg-[#0650DA] text-white">General Inquiry</option>
                <option value="support" className="bg-[#0650DA] text-white">Support</option>
                <option value="business" className="bg-[#0650DA] text-white">Business</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-[1.381cqw]">
                <svg 
                  className="fill-white w-[3.682cqw] h-[3.682cqw]" 
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Row 4: Message */}
          <div className="relative z-20 flex flex-col gap-[1.036cqw] mt-[3.797cqw] w-[77.676cqw]">
            <label 
              htmlFor="message" 
              className="font-nova-custom font-normal text-[3.222cqw] leading-[2.762cqw] tracking-[-0.01em]"
            >
              Message Here
            </label>
            <textarea 
              id="message" 
              name="message"
              className="bg-transparent border-white font-fira-custom text-white outline-none transition-colors h-[31.645cqw] resize-none border-[0.115cqw] border-solid p-[1.381cqw] text-[1.611cqw]"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="relative z-0 mt-[2.762cqw] ml-[58.007cqw]">
            <button 
              type="submit"
              className="bg-black text-white font-normal flex items-center justify-center w-[19.642cqw] h-[4.718cqw] font-fira-custom text-[1.726cqw] leading-[1.726cqw] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
