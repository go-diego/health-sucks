import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

export default function HomePage() {
    return (
        <MainLayout>
            <section className="section container">
                <h1 className="title">Health Sucks</h1>
            </section>
        </MainLayout>
    );
}
