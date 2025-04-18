export default async function ({ children }) {
  return (
    <>
      <div className="w-screen min-h-screen">{children}</div>
    </>
  );
}
