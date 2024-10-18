import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

export const HeaderLogo2 = ({
  className,
}: { className?: string }) => {
  return (
    <div className={`flex flex-row text-2xl max-h-12   ${className}`}>
      {/* <LogoIcon /> */}
      {/* <img className='aspect-auto' src={'/img/icon.png'} alt={'MentalAbi'} /> */}
      {/* <div className='text-2xl '> */}
      {/* {process.env.NEXT_PUBLIC_APP_TITLE || 'ENV ERROR'} */}
      <div className='bg-black text-white p-1 border border-gray-400 rounded-tl-sm rounded-bl-sm font-semibold'>
        Trend
      </div>
      <div className='bg-white text-black p-1 border border-gray-400 rounded-tr-sm rounded-br-sm font-semibold relative'>
        Senfoni
        {/* <span className='absolute top-[-18px] end-[-16px] text-[10px] px-2 py-0 rounded-sm bg-gray-100 text-blue-600 h-7 pb-2'> */}
        {/* <i className="fa-solid fa-chess-king"></i> */}
        {/* admin
        </span> */}
      </div>
      {/* </div> */}
    </div>
  )
}