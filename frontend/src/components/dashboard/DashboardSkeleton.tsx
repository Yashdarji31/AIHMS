import { Skeleton } from "@/components/ui/skeleton";


export default function DashboardSkeleton() {

    return (

        <div className="space-y-6">


            {/* Header */}

            <Skeleton
                className="
h-10
w-72
"
            />



            {/* Stats */}

            <div
                className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4
"
            >


                {
                    Array.from({
                        length: 4
                    }).map((_, i) => (


                        <Skeleton

                            key={i}

                            className="
h-32
rounded-2xl
"

                        />


                    ))

                }


            </div>




            {/* Charts */}

            <div

                className="
grid
lg:grid-cols-2
gap-6
"

            >


                <Skeleton

                    className="
h-80
rounded-2xl
"

                />


                <Skeleton

                    className="
h-80
rounded-2xl
"

                />


            </div>


        </div>

    )

}