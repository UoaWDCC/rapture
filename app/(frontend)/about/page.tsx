import ContactForm from "../components/ContactForm";
import ContactFile from "../components/ui/ContactFileDesign.tsx";

export default async function aboutPage() {
    return (
        <div className="mt-40 mb-80 flex flex-row">
            <ContactForm />

            <div className="absolute left-0 h-full flex flex-row">
                <ContactFile title="About Us (1)" bgColor="bg-red-800" />
                <ContactFile title="About Us (2)" bgColor="bg-yellow-700" />
                <ContactFile title="About Us (3)" bgColor="bg-green-800" />
            </div>
        </div>
    )
}