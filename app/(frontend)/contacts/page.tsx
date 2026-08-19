import ContactForm from "../components/ContactForm";

export default async function Page() {
  return (
    <div className="container mx-auto my-6 px-4 space-y-4">
      <ContactForm />

      <div className="absolute top-500 right-2">
        <br />
        <p>It&apos;s the Contacts Page.</p>
      </div>
    </div>
  );
}
