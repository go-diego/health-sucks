import MainLayout from "../containers/MainLayout";
import Fitbit from "../api/fitbit.api";

import to from "../utils/to";

export default class DeviceDataPage extends React.Component {
    static async getInitialProps({query}) {
        console.log("QUERY", query);
        const {id, token, secret} = query;
        const FitbitApi = new Fitbit(id, secret, token);
        const activitiesPromise = FitbitApi.getActivities();
        const frequentActivitiesPromise = FitbitApi.getFrequentActivities();
        const weekHeartRatePromise = FitbitApi.getWeekHeartRate();

        const activities = await activitiesPromise;
        const frequentActivities = await frequentActivitiesPromise;
        const weekHeartRate = await weekHeartRatePromise;

        return {activities, frequentActivities, weekHeartRate};
    }

    render() {
        const {activities, frequentActivities, weekHeartRate} = this.props;
        return (
            <MainLayout>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Data</h1>
                        <div className="section">
                            <h2 className="title">Lifetime Statistics</h2>
                            <div>{JSON.stringify(activities)}</div>
                        </div>
                        <div className="section">
                            <h2 className="title">Frequent Activities</h2>
                            <div>{JSON.stringify(frequentActivities)}</div>
                        </div>
                        <div className="section">
                            <h2 className="title">Heart Beat for the Week</h2>
                            <div>{JSON.stringify(weekHeartRate)}</div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }
}
