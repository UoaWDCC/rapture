import React from 'react';

interface ContactFormProps {
  title?: string;
  description?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactForm({
  title = "Contact Us",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis.",
  onSubmit,
}: ContactFormProps) {
  return (
    <div className="w-full max-w-[869px] min-w-[320px] mx-auto @container">
      <div className="relative w-full bg-[#0650DA]/30 text-white overflow-hidden aspect-869/980 pt-[9.206cqw] pl-[14.384cqw] pr-[7.940cqw] pb-[11.507cqw]">
        
        {/* Heading */}
        <h2 className="font-nova-custom font-normal text-[5.524cqw] leading-[4.604cqw] tracking-normal">
          {title}
        </h2>

        {/* Description */}
        <div className="font-fira-custom font-normal mt-[1.956cqw] text-[1.611cqw] leading-[1.841cqw] max-w-[68.929cqw] tracking-[-0.01em]">
          {description}
        </div>

        {/* Form */}
        <form 
          className="flex flex-col mt-[4.373cqw]" 
          onSubmit={onSubmit}
          autoComplete="off"
        >
          
          {/* Row 1: First and Last Name */}
          <div className="flex flex-row gap-[4.028cqw]">
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
          <div className="flex flex-col gap-[1.266cqw] mt-[3.797cqw] w-[77.676cqw]">
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
            />
          </div>

          {/* Row 3: Enquiry Category */}
          <div className="flex flex-col gap-[1.036cqw] mt-[3.567cqw] w-[46.145cqw]">
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
          <div className="flex flex-col gap-[1.036cqw] mt-[3.797cqw] w-[77.676cqw]">
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
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-[2.762cqw] ml-[58.007cqw]">
            <button 
              type="submit"
              className="bg-black text-white font-normal flex items-center justify-center w-[19.642cqw] h-[4.718cqw] font-fira-custom text-[1.726cqw] leading-[1.726cqw]"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
