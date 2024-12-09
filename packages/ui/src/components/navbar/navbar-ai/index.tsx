import { Badge, Button, Icon, Spacer, Text } from '@/components'
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
        <CarouselItem>
          <div className="relative mx-auto mb-6 mt-auto flex w-[178px] py-5 px-5 bg-background-4 flex-col items-center gap-2.5 text-center border rounded-md">
            <div className="flex flex-col items-center gap-1">
              <div className="relative mt-3 mb-3">
                <div className="absolute bottom-2 left-2 z-[-1] size-[42px]">
                  <Icon
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-plus-lighter blur-[15px]"
                    name="harness-gradient-ellipse"
                    size={102}
                  />
                </div>
                <Icon name="harness-gradient" size={44} />
              </div>
              <Badge size={'sm'} theme="success" className="absolute left-2.5 top-2.5">
                New
              </Badge>
              <Text className="leading-snug text-foreground-1" size={2} weight="normal">
                Code vulnerabilty detection
              </Text>
              <Spacer size={2} />
              <Text className="leading-snug text-foreground-5" size={1}>
                Identify and fix with AI.
              </Text>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative mx-auto mb-6 mt-auto flex w-[178px] py-5 px-5 bg-background-4 flex-col items-center gap-2.5 text-center border rounded-md">
            <div className="flex flex-col items-center gap-1">
              <div className="relative mt-3 mb-3">
                <div className="absolute bottom-2 left-2 z-[-1] size-[42px]">
                  <Icon
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-plus-lighter blur-[15px]"
                    name="harness-gradient-ellipse"
                    size={102}
                  />
                </div>
                <Icon name="harness-gradient" size={44} />
              </div>
              <Badge size={'sm'} theme="emphasis" className="absolute left-2.5 top-2.5">
                New
              </Badge>
              <Text className="leading-snug text-foreground-1" size={2} weight="normal">
                Quickly review PRs with AI
              </Text>
              <Spacer size={2} />
              <Text className="leading-snug text-foreground-5" size={1}>
                Unblock your team
              </Text>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
