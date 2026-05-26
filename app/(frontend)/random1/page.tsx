import PopUp from "@/app/(frontend)/components/ui/GamePopUp"

export default async function Page() {
  const example_text= "Ut sollicitudin justo vel congue sollicitudin. Phasellus a posuere magna, vitae malesuada augue. Maecenas dignissim, ipsum a maximus posuere, velit enim placerat est, in tempor nisl metus eget mi. Etiam interdum, nulla in dapibus euismod, augue elit dignissim velit, in pulvinar risus dolor ac tortor.Curabitur eu molestie nisl. Pellentesque commodo scelerisque magna ut malesuada. Quisque aliquam eget arcu sit amet malesuada. In in egestas turpis. Quisque consequat vel nulla at condimentum. Nulla facilisi. Proin gravida vestibulum libero. Mauris sagittis dignissim dignissim. Mauris cursus, diam eget mollis maximus, augue libero pharetra metus, a tincidunt leo velit eget risus. "
  return (
    <div className="container mx-auto my-6 px-4 space-y-4">
      <PopUp width={300} height={200} title="Hello World" text={example_text} />
    </div>
  );
}
