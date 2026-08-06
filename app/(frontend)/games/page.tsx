import PopUp from '../components/ui/PopUp'

export default async function GamesPage() {
  return (
    <section>
      {/* Mobile */}
      <div className="flex flex-col items-center gap-4 px-4 md:hidden">
        <PopUp src="/images/popup-01.png" alt="popup-01.png" width={1341} height={469} />
        <PopUp title="Title Card" text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
        <PopUp src="/images/popup-02.png" alt="popup-02.png" width={600} height={319} />
        <PopUp src="/images/popup-03.png" alt="popup-03.png" width={600} height={309} />
        <PopUp text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa" />
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden md:block w-full max-w-6xl min-h-[1100px]">
        {/* Images */}
        <PopUp src="/images/popup-01.png" alt="popup-01.png" width={1341} height={469} />
        <div className='absolute right-[30] top-[350]'>
          <PopUp src="/images/popup-02.png" alt="popup-02.png" width={600} height={319} />
        </div>
        <div className='absolute right-[240] top-[650]'>
          <PopUp src="/images/popup-03.png" alt="popup-03.png" width={600} height={309} />
        </div>

        {/* Text */}
        <div className='absolute left-20 top-[300] w-[360]'>
          <PopUp title="Title Card" text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
        </div>
        <div className='absolute w-[200] right-30 top-180'>
          <PopUp text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa" />
        </div>
      </div>

      <h4 className='text-center'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo</h4>

      <div className='pb-30'></div>
    </section>
  )
}