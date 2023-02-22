import classNames from "classnames";

export function StatusPill({ value }) {
  const status = value ? "active" : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        value ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
}
