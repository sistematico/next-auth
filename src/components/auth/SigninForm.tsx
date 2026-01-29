export default function SigninForm() {
  return (
    <div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="w-full rounded border-2 border-background-alt" type="password" id="password" name="password" />
      </div>
      <button className="rounded px-3 py-2 border-2 border-black/50 transition-all hover:bg-black/50 cursor-pointer" type="submit">Sign In</button>
    </div>
  );
}
