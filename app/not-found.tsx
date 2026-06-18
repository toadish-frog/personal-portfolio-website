export default function NotFound() {
  return (
    <section className="antialiased max-w-6xl mx-2 mt-8 lg:mx-auto flex-auto min-w-0 mt-6 flex flex-col px-8">
      <h1 className="mt-8 mb-8 text-2xl font-semibold tracking-tighter mx-auto">
        404 - Page Not Found
      </h1>
      <pre className="font-mono whitespace-pre text-[10px] leading-none tracking-normal block overflow-x-auto bg-neutral-900 p-4 rounded-lg text-white w-fit mx-auto">
        {`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠒⠈⠉⣠⣤⣤⣄⠈⠁⠒⢤⣤⣤⡀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
⠀⠀⣠⣶⣿⣿⣶⣎⠁⠀⠀⠀⠀⠻⠋⠁⠈⠀⠀⠀⠈⠉⠻⡇⠀⠀⠀⠀⠛⠛⠛⠛⠛⢻⣿⣿⣿⠟⠁
⠀⣼⣿⡟⠉⡹⡿⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠀⠀⠀⠑⢜⣆⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⠋⠀⠀
⢠⣿⣿⣧⣶⣷⣦⣄⠀⠀⠀⠀⠀⣀⣠⢤⠤⠤⠤⣵⣤⣤⠐⢒⡏⡄⠀⠀⠀⠀⠀⣼⣿⣿⣿⠃⠀⠀⠀
⢸⣿⣿⡟⡍⠙⣿⣿⡆⠀⠀⠀⠸⡁⢿⣿⠇⠀⠀⣼⠿⠿⠀⢠⡟⡇⠀⠀⠀⠀⣰⣿⣿⣿⡇⠀⠀⠀⠀
⠈⣿⣿⡆⣇⢀⣿⣿⡇⠀⠀⠀⠀⠑⠤⣀⡀⠤⠊⠀⠑⠂⠰⠟⠁⡇⠀⠀⠀⢀⣿⣿⣿⣿⠁⠀⠀⠀⠀
⠀⠙⢿⣿⣾⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⢠⠁⡹⠋⠩⣭⣤⣤⡀⠀⠀
⠀⠀⠀⠉⢹⣏⡉⢦⠀⠀⠀⠀⠀⠀⢤⠄⣀⣀⣀⣀⣀⣀⡀⢀⠆⠀⠀⠀⣂⠒⠂⢉⠐⠚⠚⢲⠇⠀⠀
⠀⡔⠀⠏⠓⢷⣼⡿⡓⡦⡀⠀⠀⠀⠀⠀⣠⣀⣀⡀⠀⠀⢠⠎⠀⠀⠀⠀⠙⠛⠋⠉⠉⠉⠉⠁⠀⠀⠀
⠀⠈⠈⠑⠒⠛⢇⣨⣿⣼⣃⡀⠀⠀⠀⠀⠀⠉⠀⠀⣀⠴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠷⠶⠶⠶⠶⠶⢒⣉⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠀⡟⢿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠁⠀⠀⡇⠀⢻⡿⣿⣶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠟⠈⡻⣿⡿⣶⠤⢼⣧⣴⡅⠉⠋⡁⣀⣌⣹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣄⡜⠀⠘⠋⠀⣠⣆⣨⣯⠓⠯⠩⠭⠷⠛⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠺⠯⣛⣉⣭⠱⠤⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`}
      </pre>

      {/* <p className="mb-4">
        The page you are looking for does not exist.
      </p> */}
    </section>
  )
}