export default function Footer() {
  return (
    <footer className="border-t border-[#eadfda] bg-[#fffdf9]/85 px-5 py-8 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm text-[#746f86] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg font-bold text-[#27233b]">WishCron</p>
          <p className="mt-1 max-w-md leading-6">Thoughtful birthday reminders that help you stay close to the people who matter.</p>
          <a className="mt-3 inline-block font-semibold text-[#d94d49] transition hover:text-[#8d83ce]" href="mailto:yashthakur11092005@gmail.com">yashthakur11092005@gmail.com</a>
        </div>
        <p className="font-semibold text-[#746f86]">Made by - Yash Thakur</p>
      </div>
    </footer>
  );
}
