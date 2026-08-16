import { Player } from "@/payload-types";
import React from "react";
import Image from "next/image";

interface LeaderboardTableProps {
  players: Player[];
  startIndex?: number;
}

/**
 * LeaderboardTable
 * Fully fluid & proportionally scalable scoreboard.
 * Strategy: aspect-ratio locks dimensions; cqw units scale text/accents; percentages handle layout.
 * Max size capped at 916px x 771px via Tailwind max-w.
 */
export function LeaderboardTable({ players, startIndex = 1 }: LeaderboardTableProps) {
  return (
    <div className="w-full max-w-229 mx-auto @container">
      <div 
        className="relative bg-black text-white border-[0.327cqw] border-[#3727EA] rounded-[0.327cqw] shadow-2xl overflow-hidden aspect-916/771"
      >
        {/* Vertical Grid Lines - Positioned via percentages for fluid scaling */}
        <div className="absolute pointer-events-none z-10 left-[13.865%] top-[11.778%] w-[0.218cqw] h-[88.222%]">
          <Image 
            src="/images/vertical-line.png" 
            alt="" 
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="absolute pointer-events-none z-10 left-[60.699%] top-[11.778%] w-[0.218cqw] h-[88.222%]">
          <Image 
            src="/images/vertical-line.png" 
            alt="" 
            fill
            className="object-fill"
            priority
          />
        </div>

        {/* Header Labels - text-[cqw] ensures uniform scaling with container width */}
        <div className="absolute left-[3.384%] top-[4.02%] w-[1.965%] text-[3.057cqw] leading-none font-nova font-normal z-20">
          #
        </div>
        <div className="absolute left-[20.633%] top-[4.02%] w-[9.934%] text-[3.057cqw] leading-none font-nova font-normal z-20">
          NAME
        </div>
        <div className="absolute left-[68.341%] top-[4.02%] w-[9.934%] text-[3.057cqw] leading-none font-nova font-normal z-20">
          SCORE
        </div>

        {/* Heading Bottom Line */}
        <div className="absolute bg-[#3727EA] left-0 top-[11.737%] w-full h-[0.261%] z-20" />

        {/* Rows Container */}
        <div className="absolute top-[11.737%] left-0 w-full h-[88.263%] flex flex-col">
          {Array.from({ length: 10 }).map((_, index) => {
            const player = players?.[index];
            const rank = startIndex + index;
            
            return (
              <div key={index} className="relative flex-1 w-full">
                {player && (
                  <>
                    <div className="absolute left-[3.384%] top-1/2 -translate-y-1/2 w-[10.48%] text-[2.62cqw] font-nova font-normal leading-none">
                      {rank}
                    </div>
                    <div className="absolute left-[18.341%] top-1/2 -translate-y-1/2 w-[42.47%] text-[2.62cqw] font-nova font-normal leading-none truncate">
                      {player.userId || "Unknown Player"}
                    </div>
                    <div className="absolute left-[64.629%] top-1/2 -translate-y-1/2 w-[35.26%] text-[2.62cqw] font-nova font-normal leading-none">
                      {player.score}
                    </div>
                  </>
                )}

                {/* Horizontal accents conditionally rendered to avoid bottom duplication */}
                {index < 9 && (
                  <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10 h-[0.437cqw]">
                    <Image 
                      src="/images/horizontal-line.png" 
                      alt="" 
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
