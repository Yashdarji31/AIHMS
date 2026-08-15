import {
  useState,
  useMemo,
  type ReactNode,
} from "react";

import { motion } from "framer-motion";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EmptyState } from "@/components/app/empty-state";


// ======================================================
// COLUMN TYPE
// ======================================================

export interface Column<T> {

  key: keyof T | string;

  header: string;

  cell?: (
    row: T
  ) => ReactNode;

  className?: string;

}



// ======================================================
// DATA TABLE
// ======================================================

export function DataTable<
  T extends {
    id: string | number;
  }
>({

  rows,

  columns,

  searchKeys,

  toolbar,

  pageSize = 8,

}: {

  rows: T[];

  columns: Column<T>[];

  searchKeys?: (keyof T)[];

  toolbar?: ReactNode;

  pageSize?: number;

}) {



  const [
    q,
    setQ
  ] = useState("");



  const [
    page,
    setPage
  ] = useState(1);



  // ====================================================
  // SEARCH
  // ====================================================


  const filtered = useMemo(() => {


    if (!q)

      return rows;



    const term =
      q.toLowerCase();



    return rows.filter(
      (row) =>

        (
          searchKeys ??
          (Object.keys(row) as (keyof T)[])
        )

          .some(

            (key) =>

              String(
                row[key] ?? ""
              )

                .toLowerCase()

                .includes(term)

          )

    );


  }, [
    q,
    rows,
    searchKeys
  ]);




  // ====================================================
  // PAGINATION
  // ====================================================


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filtered.length /
        pageSize
      )
    );



  const current =
    Math.min(
      page,
      totalPages
    );



  const paginated =
    filtered.slice(
      (current - 1) * pageSize,
      current * pageSize
    );




  return (

    <div
      className="
      space-y-4
      "
    >


      {/* SEARCH BAR */}

      <div
        className="
        flex
        flex-wrap
        items-center
        gap-3
        "
      >


        <div
          className="
          relative
          w-full
          sm:w-80
          "
        >


          <Search

            className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-muted-foreground
            "

          />



          <Input

            value={q}

            onChange={(e) => {

              setQ(
                e.target.value
              );

              setPage(1);

            }}

            placeholder="
            Search...
            "

            className="
            h-10
            rounded-xl
            pl-10
            "

          />


        </div>



        <div
          className="
          ml-auto
          flex
          items-center
          gap-2
          "
        >

          {toolbar}

        </div>


      </div>





      {/* TABLE */}


      <div

        className="
        overflow-hidden
        rounded-2xl
        border
        bg-card
        shadow-sm
        "

      >


        <Table>


          {/* HEADER */}

          <TableHeader>


            <TableRow>


              {
                columns.map(
                  (column) => (

                    <TableHead

                      key={
                        String(
                          column.key
                        )
                      }

                      className={
                        column.className
                      }

                    >

                      {
                        column.header
                      }


                    </TableHead>

                  )
                )
              }


            </TableRow>


          </TableHeader>





          {/* BODY */}


          <TableBody>


            {
              paginated.length === 0

                ?


                (

                  <TableRow>


                    <TableCell

                      colSpan={
                        columns.length
                      }

                      className="
                  h-64
                  "

                    >

                      <EmptyState

                        icon={Inbox}

                        title="
                    No results
                    "

                        description="
                    Try adjusting your search or filters.
                    "

                      />


                    </TableCell>


                  </TableRow>


                )


                :


                (

                  paginated.map(

                    (row, index) => (


                      <motion.tr


                        key={
                          row.id
                        }


                        initial={{
                          opacity: 0,
                          y: 10
                        }}


                        animate={{
                          opacity: 1,
                          y: 0
                        }}


                        transition={{
                          duration:
                            0.2,
                          delay:
                            index * 0.03
                        }}


                        className="
                  hover:bg-muted/50
                  transition
                  "

                      >



                        {
                          columns.map(
                            (column) => (


                              <TableCell

                                key={
                                  String(
                                    column.key
                                  )
                                }


                                className={
                                  column.className
                                }

                              >


                                {

                                  column.cell

                                    ?

                                    column.cell(row)

                                    :

                                    (row as any)[
                                    column.key
                                    ]

                                }



                              </TableCell>


                            )
                          )
                        }



                      </motion.tr>


                    )

                  )

                )

            }


          </TableBody>


        </Table>


      </div>






      {/* PAGINATION */}


      <div

        className="
        flex
        items-center
        justify-between
        text-xs
        text-muted-foreground
        "

      >


        <div>

          Showing{" "}

          {
            paginated.length === 0

              ?

              0

              :

              (
                (current - 1)
                *
                pageSize
              )
              + 1

          }

          –

          {
            (
              current - 1
            )
            *
            pageSize
            +
            paginated.length
          }

          {" "}of{" "}

          {
            filtered.length
          }


        </div>





        <div
          className="
          flex
          items-center
          gap-2
          "
        >


          <Button

            variant="outline"

            size="icon"

            className="
            h-8
            w-8
            rounded-lg
            "

            disabled={
              current <= 1
            }

            onClick={() => {

              setPage(
                p => p - 1
              );

            }}

          >

            <ChevronLeft
              className="
              h-4
              w-4
              "
            />


          </Button>





          <span>

            Page {current} of {totalPages}

          </span>





          <Button

            variant="outline"

            size="icon"

            className="
            h-8
            w-8
            rounded-lg
            "

            disabled={
              current >= totalPages
            }

            onClick={() => {

              setPage(
                p => p + 1
              );

            }}

          >

            <ChevronRight
              className="
              h-4
              w-4
              "
            />

          </Button>


        </div>


      </div>


    </div>


  );

}