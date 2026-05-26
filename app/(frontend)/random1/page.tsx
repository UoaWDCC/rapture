import Image from "next/image"
import PopUp from "@/app/(frontend)/components/ui/PopUp"

export default async function Page() {
  const example_text= "Ut sollicitudin justo vel congue sollicitudin. Phasellus a posuere magna, vitae malesuada augue. Maecenas dignissim, ipsum a maximus posuere, velit enim placerat est, in tempor nisl metus eget mi. Etiam interdum, nulla in dapibus euismod, augue elit dignissim velit, in pulvinar risus dolor ac tortor.Curabitur eu molestie nisl. Pellentesque commodo scelerisque magna ut malesuada. Quisque aliquam eget arcu sit amet malesuada. In in egestas turpis. Quisque consequat vel nulla at condimentum. Nulla facilisi. Proin gravida vestibulum libero. Mauris sagittis dignissim dignissim. Mauris cursus, diam eget mollis maximus, augue libero pharetra metus, a tincidunt leo velit eget risus. "
  
  return (
    <div className="container mx-auto my-6 px-4 space-y-4">
      <PopUp title="Hello World" text={example_text} className="absolute top-100 right-50 w-200 z-50" />
      <PopUp src="/images/ivlnaud5zro61.png" alt="logo.png" width={550} height={700} className="absolute top-90 left-30 z-49" />
    </div>
  );
}
