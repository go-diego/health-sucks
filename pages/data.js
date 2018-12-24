import MainLayout from "../containers/MainLayout";
import Fitbit from "../api/fitbit.api";

export default class DeviceDataPage extends React.Component {
    static async getInitialProps({query}) {
        console.log("QUERY", query);
        const {id, token, secret} = query;
        const FitbitApi = new Fitbit(id, secret, token);
        const activities = await FitbitApi.getActivities();
        return {activities};
    }

    render() {
        const {activities} = this.props;
        return (
            <MainLayout>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Data</h1>
                        <div className="section">
                            <h2 className="title">Activities</h2>
                            <div>{JSON.stringify(activities)}</div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }
}
