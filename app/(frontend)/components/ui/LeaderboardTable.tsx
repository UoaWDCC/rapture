import { Player } from "@/payload-types";
import React from "react";
import Image from "next/image";

interface LeaderboardTableProps {
  players: Player[];
  startIndex?: number;
}

export function LeaderboardTable({ players, startIndex = 1 }: LeaderboardTableProps) {
  return (
    <div 
      className="relative bg-black text-white border-[3px] border-[#3727EA] rounded-[3px] overflow-hidden shadow-2xl mx-auto"
      style={{ width: '916px', height: '771px' }}
    >
      {/* 2 Vertical Lines - Precise positioning from Figma */}
      <div 
        className="absolute pointer-events-none" 
        style={{ left: '127px', top: '90.81px', height: '680.19px', width: '2px' }} 
      >
        <Image 
          src="/images/vertical-line.png" 
          alt="Vertical Line" 
          fill
          className="object-cover"
        />
      </div>
      <div 
        className="absolute pointer-events-none" 
        style={{ left: '556px', top: '90.81px', height: '680.19px', width: '2px' }} 
      >
        <Image 
          src="/images/vertical-line.png" 
          alt="Vertical Line" 
          fill
          className="object-cover"
        />
      </div>

      {/* Header labels at exactly 31px from top */}
      <div 
        className="absolute text-[#FFFFFF] text-[28px] leading-none"
        style={{ width: '18px', left: '31px', top: '31px', fontFamily: "'Nova Cut', cursive", fontWeight: 400 }}
      >
        #
      </div>
      <div 
        className="absolute text-[#FFFFFF] text-[28px] leading-none"
        style={{ width: '91px', left: '189px', top: '31px', fontFamily: "'Nova Cut', cursive", fontWeight: 400 }}
      >
        NAME
      </div>
      <div 
        className="absolute text-[#FFFFFF] text-[28px] leading-none"
        style={{ width: '91px', left: '626px', top: '31px', fontFamily: "'Nova Cut', cursive", fontWeight: 400 }}
      >
        SCORE
      </div>

      {/* Heading Line - weight 2, positioned center */}
      <div 
        className="absolute bg-[#3727EA] left-1/2 -translate-x-1/2"
        style={{ top: '90.49px', width: '916px', height: '2px' }}
      />

      {/* Rows Container - Fixed structure with 10 rows */}
      <div 
        className="absolute w-full"
        style={{ top: '90.49px', height: '680.39px' }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          const player = players[index];
          const rank = startIndex + index;
          const rowHeight = index === 0 ? '63.71px' : '68.52px';
          
          return (
            <div 
              key={player?.id || index} 
              className="relative w-full"
              style={{ height: rowHeight }}
            >
              {player && (
                <>
                  <div 
                    className="absolute flex items-center text-white"
                    style={{ 
                      width: '96px', height: '60px', 
                      left: '31px', top: '50%', transform: 'translateY(-50%)',
                      fontFamily: "'Nova Cut', cursive", fontSize: '24px', fontWeight: 400,
                      lineHeight: 'normal', letterSpacing: '0px'
                    }}
                  >
                    {rank}
                  </div>
                  <div 
                    className="absolute flex items-center text-white truncate"
                    style={{ 
                      width: '389px', height: '64px',
                      left: '168px', top: '50%', transform: 'translateY(-50%)',
                      fontFamily: "'Nova Cut', cursive", fontSize: '24px', fontWeight: 400,
                      lineHeight: 'normal', letterSpacing: '0px'
                    }}
                  >
                    {player.userId || "Unknown Player"}
                  </div>
                  <div 
                    className="absolute flex items-center text-white"
                    style={{ 
                      width: '323px', height: '61px',
                      left: '592px', top: '50%', transform: 'translateY(-50%)',
                      fontFamily: "'Nova Cut', cursive", fontSize: '24px', fontWeight: 400,
                      lineHeight: 'normal', letterSpacing: '0px'
                    }}
                  >
                    {player.score}
                  </div>
                </>
              )}

              {/* Default unselected line (Horizontal Line Image) - Always shown for all 10 slots */}
              <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '4px' }}>
                <Image 
                  src="/images/horizontal-line.png" 
                  alt="Horizontal Line" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
