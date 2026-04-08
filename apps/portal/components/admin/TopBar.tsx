export default function TopBar({ email }: { email: string }) {
  return (
    <header className="border-b border-sand bg-parchment/95 backdrop-blur-sm">
      <div className="px-8 py-3.5 flex items-center justify-between">
        <p className="font-mono text-[0.7rem] text-fog">
          Signed in as{" "}
          <span className="text-driftwood">{email}</span>
        </p>
        <form action="/auth/sign-out" method="post">
          <button
            type="submit"
            className="text-[0.78rem] text-driftwood hover:text-espresso transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
