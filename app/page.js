import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="">
            <div className="flex flex-col  lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
                <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
                    <h1 className="text-5xl font-bold">
                        Welcome to Dropbox.
                        <br />
                        Storing everything for you and your business needs. All
                        in one place.
                    </h1>
                    <p className="pb-20">
                        Enhance your personal storage with Dropbox, offering a
                        simple and efficient way to upload, organize, and access
                        files from anywhere. Securely store important documents
                        and media, and experience the convenience of easy file
                        management and sharing in one centralized solution.
                    </p>
                    <Link
                        href="/dashboard"
                        className="flex cursor-pointer bg-blue-500 p-5 w-fit"
                    >
                        Try it for free! <ArrowRight className="ml-10" />
                    </Link>
                </div>
                <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
                    <video autoPlay loop muted className="rounded">
                        <source
                            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
            <p className="text-center font-light p-2">
                This is a Dropbox clone made for educational purposes only. I&apos;m
                not affilated with Dropbox or any of its susbsidiaries in any
                form.
            </p>
        </main>
    );
}
