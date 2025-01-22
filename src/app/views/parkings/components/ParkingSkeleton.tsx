import { Skeleton } from "@heroui/skeleton";

export default function ParkingSkeleton() {
    return (
        <div className="pt-28 pl-8 flex h-screen">
            <div className="flex bg-white rounded-xl w-1/2 p-3 my-3 h-40 shadow-lg">
                <div className="">
                    <Skeleton className="rounded-full h-12 w-12" />
                </div>
                <div className="flex flex-col justify-between grow pl-4">
                    <div className="flex flex-col">
                        <Skeleton className="h-5 w-3/5 rounded-lg" />
                        <div className="flex items-baseline text-slate-400 my-3">
                            <Skeleton className="h-4 w-4/5 rounded-lg" />
                        </div>
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                    </div>
                    <div className="flex justify-between">
                        <div></div>
                        <Skeleton className="h-5 w-1/3 rounded-lg mr-4" />
                    </div>
                </div>
                <div className="flex flex-col justify-between w-1/5">
                    <div className="text-[#2B77C4]">
                        <Skeleton className="h-4 w-1/2 rounded-lg mb-3" />
                        <Skeleton className="h-6 w-2/5 rounded-lg" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-xl" />
                </div>
            </div>
            <div className="w-1/2 h-full px-8 pb-8">
                <Skeleton className="rounded-lg h-full w-full">
                    <div className="h-full w-full rounded-lg bg-default-300" />
                </Skeleton>
            </div>
        </div>
    );
}