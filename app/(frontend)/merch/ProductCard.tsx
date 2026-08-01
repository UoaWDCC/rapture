import Link from 'next/link';
import Image from 'next/image';

export interface Product {
  id: number;
  name: string;
  type: 'hoodie' | 'sweater' | 'top' | 'pants' | 'shorts' | 'accessories' | 'decor';
  image?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  // Base 421px scaling to cqw
  const px = (val: number) => `calc(${val} / 421 * 100cqw)`;

  // Dynamic box shadow (scales with cqw)
  const greenBoxShadow = `
    0 0 ${px(42.44)} rgba(32, 128, 90, 0.92),
    0 0 ${px(24.25)} rgba(32, 128, 90, 0.92),
    0 0 ${px(14.15)} rgba(32, 128, 90, 0.92),
    0 0 ${px(7.07)} rgba(32, 128, 90, 0.92),
    0 0 ${px(2.02)} rgba(32, 128, 90, 0.92),
    0 0 ${px(1.01)} rgba(32, 128, 90, 0.92)
  `;

  // SVG drop-shadow emulator

  return (
    <Link href="/" className="block group w-full" style={{ containerType: 'inline-size' }}>
      <div 
        className="relative w-full overflow-visible" 
        style={{ height: px(552) }}
      >
        {/* Top Tab Layer */}
        <div 
          className="absolute z-20 overflow-visible"
          style={{ top: 0, left: 0, width: px(108), height: px(40) }}
        >
          {/* Trapezium Top Tab */}
          <svg 
            viewBox="0 0 108 40" 
            className="absolute top-0 left-0 w-full h-full overflow-visible"
          >
            <defs>
              <clipPath id="tab-clip">
                <polygon points="0,0 79.3,0 108,40 0,40" />
              </clipPath>
            </defs>
            
            {/* Layered shadow blurs */}
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(27.22)})` }} />
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(15.55)})` }} />
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(9.07)})` }} />
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(4.54)})` }} />
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(1.3)})` }} />
            <polygon points="0,0 79.3,0 108,40 0,40" fill="rgba(32, 128, 90, 0.92)" style={{ filter: `blur(${px(0.65)})` }} />
            
            {/* Main Shape */}
            <polygon 
              points="0,0 79.3,0 108,40 0,40" 
              fill="rgba(32, 128, 90, 0.15)"
              stroke="#FFFFFF" 
              strokeWidth="2" 
              clipPath="url(#tab-clip)"
            />
          </svg>
        </div>

        {/* Image Container */}
        <div 
          className="absolute z-10 border border-white bg-black/50 overflow-hidden"
          style={{ 
            top: px(39), left: 0, 
            width: px(421), height: px(331), 
            borderWidth: '1px' 
          }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 421px"
            />
          ) : (
            /* "item image here" fallback */
            <div 
              className="absolute text-white text-left flex items-center"
              style={{ 
                top: px(151), 
                left: px(130), 
                width: px(161), height: px(25), 
                fontFamily: "var(--font-fira-mono), monospace",
                fontSize: px(15), 
                lineHeight: px(20.2) 
              }}
            >
              item image here
            </div>
          )}
        </div>

        {/* Green Bottom Container */}
        <div 
          className="absolute z-30"
          style={{ 
            top: px(330), left: 0, width: px(421), height: px(222),
            background: 'linear-gradient(rgba(32, 128, 90, 0.4), rgba(32, 128, 90, 0.4)), #000000',
            border: '1px solid #FFFFFF',
            boxShadow: greenBoxShadow
          }}
        >
          {/* Product Name */}
          <div 
            className="absolute text-white font-normal"
            style={{
              top: px(22), left: px(13), width: px(224), height: px(25),
              fontFamily: "var(--font-fira-mono), monospace",
              fontSize: px(20), 
              lineHeight: px(20.2) 
            }}
          >
            {product.name}
          </div>

          {/* Item Description */}
          <div 
            className="absolute text-white font-normal"
            style={{
              top: px(47), left: px(13), width: px(224), height: px(25),
              fontFamily: "var(--font-fira-mono), monospace",
              fontSize: px(15),
              lineHeight: px(20.2)
            }}
          >
            item description here
          </div>

        </div>
      </div>
    </Link>
  );
}
