import { Skeleton } from "@/components/ui/skeleton";


export default function TableSkeleton() {

    return (

        <div
            className="
space-y-3
"
        >

            {
                Array.from({
                    length: 6
                }).map((_, i) => (

                    <Skeleton

                        key={i}

                        className="
h-12
w-full
rounded-lg
"

                    />

                ))

            }

        </div>

    )

}