import { Skeleton } from "@heroui/react";

const ReservationsSkeleton = () => {
    return (
        <div className="pt-28 pl-8 flex h-screen justify-center items-start mt-10">
            <div className="flex flex-col w-2/3">
                {[1].map((_, index) => (
                    <div
                        key={index}
                        className="flex bg-white rounded-xl w-full p-4 my-3 h-32 shadow-lg"
                    >
                        <div className="flex items-center justify-center w-16">
                            <Skeleton className="rounded-full h-10 w-10" />
                        </div>

                        <div className="flex flex-col justify-between flex-grow pl-4">
                            <div className="flex flex-col">
                                <Skeleton className="h-5 w-3/5 rounded-lg mb-2" />
                                <Skeleton className="h-4 w-4/5 rounded-lg mb-2" />
                                <Skeleton className="h-4 w-1/2 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-end w-1/4">
                            <Skeleton className="h-5 w-2/3 rounded-lg mb-2" />
                            <Skeleton className="h-10 w-1/2 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationsSkeleton;
