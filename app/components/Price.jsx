
 export default function Price({ min, max }) {
  if (min === max) return <>${min.toFixed(2)}</>;
  return (
    <>
      ${min.toFixed(2)} — ${max.toFixed(2)}
    </>
  );
}
