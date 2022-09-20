import Link from "next/link"
import MainLayout from "../components/layout/main-layout";
import { NextPageWithLayout } from "./_app";

const About: NextPageWithLayout = () => {
    return (
        <h1>
          This is the about page. <Link href="/"> Go back </Link>
        </h1>
    )
}

About.layout = MainLayout

export default About;