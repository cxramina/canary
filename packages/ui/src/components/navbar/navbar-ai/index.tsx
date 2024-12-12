import { Icon, Spacer, Text } from '@/components'
import { Carousel, CarouselContent, CarouselItem } from '@components/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const NavbarAi = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
    >
      <CarouselContent>
        <CarouselItem className="pt-6">
          <div className="relative mx-auto mb-6 mt-auto flex w-[174px] py-8 px-4 bg-background-2 border border-borders-1 flex-col items-center gap-2.5 text-center rounded-md">
            <div className="absolute -top-[22px] -z-10 h-6 px-4 w-full">
              <div className="border-x border-t border-[#C699E5] rounded-t-md bg-[linear-gradient(0deg,#C699E5_-1339.58%,rgba(198,153,229,0.00)_145.83%)] text-14 text-[#C699E5] flex items-center justify-center">
                <span>New</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <div className="absolute -bottom-[3px] -right-3 size-11">
                  <Icon
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                    name="harness-gradient-ellipse"
                    size={102}
                  />
                </div>
                <Icon name="harness-gradient" size={44} />
              </div>
              <Spacer size={3} />
              <Text className="leading-tight text-foreground-1" size={2} weight="medium">
                Code vulnerabilty detection
              </Text>
              <Spacer size={1} />
              <Text className="leading-tight text-foreground-5" size={1}>
                Identify & fix with AI
              </Text>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pt-6">
          <div className="relative mx-auto mb-6 mt-auto flex w-[174px] py-8 px-4 bg-background-2 border border-borders-1 flex-col items-center gap-2.5 text-center rounded-md">
            <div className="absolute -top-[22px] -z-10 h-6 px-4 w-full">
              <div className="border-x border-t border-[#C699E5] rounded-t-md bg-[linear-gradient(0deg,#C699E5_-1339.58%,rgba(198,153,229,0.00)_145.83%)] text-14 text-[#C699E5] flex items-center justify-center">
                <span>New</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <div className="absolute -bottom-[3px] -right-3 size-11">
                  <Icon
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                    name="harness-gradient-ellipse"
                    size={102}
                  />
                </div>
                <Icon name="harness-gradient" size={44} />
              </div>
              <Spacer size={3} />
              <Text className="leading-tight text-foreground-1" size={2} weight="medium">
                Quickly review PRs with AI
              </Text>
              <Spacer size={1} />
              <Text className="leading-tight text-foreground-5" size={1}>
                Unblock your team
              </Text>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
