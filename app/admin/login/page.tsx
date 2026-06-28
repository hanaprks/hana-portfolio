import { login } from "@/actions/login";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F3EE]">
      <form
        action={login}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-lg"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">
          Hana Portfolio CMS
        </h1>

        <div className="mb-5">
          <label className="mb-2 block text-sm">
            Email
          </label>

          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-sm">
            Password
          </label>

          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border p-3"
          />
        </div>

        <button
          className="w-full rounded-xl bg-black py-3 text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}