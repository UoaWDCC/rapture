export const dynamic = 'force-dynamic';

import DonorBox from "../components/Donor";
import DonorBigBox from "../components/DonorBigBox";
import GlitchReveal from "../components/GlitchReveal";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import DonorAdminButton from "./components/DonorAdminButton";

type MediaDoc = { url?: string } | string | number;

function getImageUrl(media: MediaDoc | null | undefined): string | undefined {
  if (!media) return undefined;
  if (typeof media === "object" && "url" in media) return media.url;
  return undefined;
}

export default async function DonorPage() {
  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isAdmin = user?.role === "admin";

  const donorResult = await payload.find({
    collection: "donors",
    sort: "createdAt",
    limit: 100,
    depth: 1,
  });

  const allDonors = donorResult.docs;
  const featuredDonors = allDonors.filter((d) => d.tier === "featured");
  const standardDonors = allDonors.filter((d) => d.tier === "standard");
  const hasData = allDonors.length > 0;

  return (
    <div className="mt-20 p-8 flex flex-col items-center">
        <GlitchReveal>
          <div className="w-full relative mb-10 flex justify-center items-center">
            <h1>DONOR</h1>
            <DonorAdminButton isAdmin={isAdmin} />
          </div>
        </GlitchReveal>

        {hasData ? (
          <>
            {featuredDonors.length > 0 && (
              <GlitchReveal className="w-[80%] md:w-[70%]" delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    {featuredDonors.map((donor, index) => (
                      <div key={donor.id} className={`relative ${index === 0 ? 'h-50' : 'h-32'}`}>
                          <div className={index === 0 ? "absolute w-full" : "relative"}>
                              <DonorBox
                                  name={donor.name}
                                  text={donor.text ?? undefined}
                                  image={getImageUrl(donor.image as MediaDoc)}
                                  tabColor={donor.tabColor ?? undefined}
                                  className={index > 0 ? "-mt-16 md:mt-0" : undefined}
                              />
                          </div>
                      </div>
                    ))}
                </div>
              </GlitchReveal>
            )}

            {standardDonors.length > 0 && (
              <GlitchReveal className="w-[80%] md:w-[70%]" delay={0.3}>
                <DonorBigBox
                    names={standardDonors.map((d) => d.name)}
                />
              </GlitchReveal>
            )}
          </>
        ) : (
          <>
            <GlitchReveal className="w-[80%] md:w-[70%]" delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                  <div className="relative h-50">
                      <div className="absolute w-full">
                          <DonorBox name="Name" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox
                              name="Name"
                              text="thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest"
                              image="DISCORD.png"
                              className="-mt-16 md:mt-0"
                          />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox name="Name" className="-mt-16 md:mt-0" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="absolute w-full">
                          <DonorBox
                              name="Name"
                              text="thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest"
                              image="DISCORD.png"
                              className="-mt-16"
                          />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox
                              name="Name"
                              text="thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest"
                              image="YT.png"
                              className="-mt-16"
                          />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox
                              name="Name"
                              text="thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest"
                              image="steam.png"
                              className="-mt-16"
                          />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="absolute w-full">
                          <DonorBox name="Name" className="-mt-16" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox name="Name" className="-mt-16" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox name="Name" className="-mt-16" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox name="Name" className="-mt-16" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox name="Name" className="-mt-16" />
                      </div>
                  </div>

                  <div className="relative h-32">
                      <div className="relative">
                          <DonorBox
                              name="Name"
                              text="thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest
                                      thisisatest thisisatest thisisatest thisisatest"
                              image="DISCORD.png"
                              className="-mt-16"
                          />
                      </div>
                  </div>
              </div>
            </GlitchReveal>

            <GlitchReveal className="w-[80%] md:w-[70%]" delay={0.3}>
              <DonorBigBox
                  names={['name', 'name', 'name', 'name', 'name',
                          'name', 'name', 'name', 'name', 'name',
                          'name', 'name', 'name', 'name', 'name',
                          'name', 'name', 'name', 'name', 'name',
                          'name', 'name', 'name', 'name', 'name',
                  ]}
              />
            </GlitchReveal>
          </>
        )}
    </div>
  )
}
