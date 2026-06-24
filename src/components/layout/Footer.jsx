export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center">

        <div>
          <p className="font-medium text-slate-700">
            Sample App
          </p>

          <p className="text-sm text-slate-500">
            Admin Dashboard Management System v1.0
          </p>
        </div>

        <div className="mt-3 md:mt-0 text-sm text-slate-400">
          © {new Date().getFullYear()} All rights reserved.
        </div>

      </div>
    </footer>
  );
}