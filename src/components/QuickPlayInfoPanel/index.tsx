import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoInformationCircleOutline } from "react-icons/io5";

const QuickPlayInfoPanel = ({ gameId }: { gameId: number }) => {
    return (
        <div className="w-full md:h-full md:col-start-2 flex flex-col gap-2 bg-base-200 p-2 rounded-lg">
            <p className="font-bold md:text-xl lg:text-2xl">
                Quickgame #{gameId}
            </p>
            <CarouselProvider
                naturalSlideHeight={1}
                naturalSlideWidth={8}
                totalSlides={4}
                visibleSlides={1}
                isPlaying={true}
                interval={10000}
            >
                <Slider className="rounded-lg shadow-lg">
                    <Slide index={0}>
                        <InfoTag text="Quickgame will not be saved" />
                    </Slide>
                    <Slide index={1}>
                        <InfoTag text="Login for more game content" />
                    </Slide>
                    <Slide index={2}>
                        <InfoTag text="Thank you for visiting NewChess" />
                    </Slide>
                    <Slide index={3}>
                        <InfoTag text="Your opponent is the default bot" />
                    </Slide>
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default QuickPlayInfoPanel;

const InfoTag = ({ text }: { text: string }) => {
    return (
        <div className="bg-base-100 flex gap-2 p-2 h-full items-center">
            <IoInformationCircleOutline className="text-primary text-xl" />
            <p>{text}</p>
        </div>
    );
};
