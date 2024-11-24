import { useState, useMemo } from "react";
import { Project } from "../market-data-access";
import { PieChart } from "@/components/ui/pie-chart";

export function InvestmentHistory({ project }: { project: Project }) {
 const [page, setPage] = useState(0);
 const itemsPerPage = 5;

 const totalPages = useMemo(() => {
  if (!project?.investments) return 0;
  return Math.ceil(project.investments.length / itemsPerPage);
 }, [project?.investments]);

 return (
  <div className="card bg-base-200">
   <div className="card-body">
    <h2 className="text-2xl font-bold mb-4">Investment History</h2>
    <div className="overflow-x-auto">
     <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
       <thead className="bg-base-300">
        <tr>
         <th className="font-bold">Investor</th>
         <th className="font-bold">Amount (USD)</th>
         <th className="font-bold">Share %</th>
         <th className="font-bold">Date</th>
         <th className="font-bold">Status</th>
        </tr>
       </thead>
       <tbody>
        {project.investments
         ?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
         .map((investment) => (
          <tr
           key={investment.id}
           className="hover:bg-base-300 transition-colors"
          >
           <td className="font-medium">{investment.investor}</td>
           <td className="font-medium">
            ${investment.amount.toLocaleString()}
           </td>
           <td className="flex items-center gap-2">
            <PieChart
             percentage={Number(
              ((investment.amount / project.raised) * 100).toFixed(2)
             )}
            />
            {((investment.amount / project.raised) * 100).toFixed(2)}%
           </td>
           <td>{new Date(investment.date).toLocaleDateString()}</td>
           <td>
            <div
             className={`badge ${
              investment.status === "completed"
               ? "badge-success"
               : "badge-warning"
             }`}
            >
             {investment.status}
            </div>
           </td>
          </tr>
         ))}
       </tbody>
      </table>
     </div>
    </div>

    {totalPages > 1 && (
     <div className="flex justify-center mt-4">
      <div className="join">
       <button
        className="join-item btn btn-sm"
        onClick={() => setPage(Math.max(0, page - 1))}
        disabled={page === 0}
       >
        «
       </button>
       {Array.from({ length: totalPages }, (_, i) => (
        <button
         key={i}
         className={`join-item btn btn-sm ${page === i ? "btn-active" : ""}`}
         onClick={() => setPage(i)}
        >
         {i + 1}
        </button>
       ))}
       <button
        className="join-item btn btn-sm"
        onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
       >
        »
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
 );
}
