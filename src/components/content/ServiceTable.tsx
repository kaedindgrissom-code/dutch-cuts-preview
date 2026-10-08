import type { Service } from "@/data/types";

function minutes(s: Service) {
  return s.durationMin ? `${s.durationMin} min` : "—";
}

export function ServiceTable({ services, caption }: { services: Service[]; caption?: string }) {
  return (
    <table className="w-full border-collapse">
      {caption ? <caption className="label mb-3 text-left text-ink-3">{caption}</caption> : null}
      <thead className="sr-only">
        <tr>
          <th scope="col">Service</th>
          <th scope="col">Duration</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.id} className="rule align-top">
            <th scope="row" className="py-3.5 pr-3 text-left font-normal sm:pr-4">
              <span className="ui block text-[17px] leading-tight">{s.name}</span>
              {s.description ? <span className="body-s mt-1 block text-ink-2">{s.description}</span> : null}
              {/* On narrow phones the duration sits under the name instead of in its own column */}
              <span className="ui mt-1 block text-[12px] text-ink-3 sm:hidden">
                {minutes(s)}
                {s.note ? ` · ${s.note}` : ""}
              </span>
              {s.note ? <span className="ui mt-1 hidden text-[12px] text-ink-3 sm:block">{s.note}</span> : null}
            </th>
            <td className="ui hidden whitespace-nowrap py-3.5 pr-4 text-right text-[13px] text-ink-3 sm:table-cell">{minutes(s)}</td>
            <td className="price whitespace-nowrap py-3.5 pl-2 text-right text-[20px]">
              {s.priceUsd === null ? "Ask" : `${s.priceFrom ? "from " : ""}$${s.priceUsd}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
