import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
}
    from "recharts";


const colors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)"
];


export default function DiseaseChart({
    data = []
}: {
    data: any[]
}) {


    return (

        <div className="
rounded-xl
border
bg-card
p-5
">


            <h2 className="font-semibold mb-4">
                Disease Distribution
            </h2>


            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >


                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={90}
                        >


                            {
                                data.map((_, i) => (

                                    <Cell
                                        key={i}
                                        fill={colors[i % 3]}
                                    />

                                ))
                            }


                        </Pie>


                        <Tooltip />


                    </PieChart>


                </ResponsiveContainer>


            </div>


        </div>

    )

}