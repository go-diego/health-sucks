import Fitbit from "../api/fitbit.api";
import CodeBlock from "./CodeBlock";

import to from "../utils/to";

export default class DeviceData extends React.Component {
    state = {
        activities: [],
        frequentActivities: [],
        weekHeartRate: []
    };

    async componentDidMount() {
        const {id, token, secret} = this.props;
        const FitbitApi = new Fitbit(id, secret, token);
        const activitiesPromise = FitbitApi.getActivities();
        const frequentActivitiesPromise = FitbitApi.getFrequentActivities();
        const weekHeartRatePromise = FitbitApi.getWeekHeartRate();

        const activities = await activitiesPromise;
        const frequentActivities = await frequentActivitiesPromise;
        const weekHeartRate = await weekHeartRatePromise;

        this.setState({activities, frequentActivities, weekHeartRate});
    }

    render() {
        const {activities, frequentActivities, weekHeartRate} = this.state;
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">Data</h1>
                    <div className="section">
                        <h2 className="title">Lifetime Statistics</h2>
                        <CodeBlock
                            language="json"
                            content={activities}
                            filename="activities.json"
                        />
                    </div>
                    <div className="section">
                        <h2 className="title">Frequent Activities</h2>
                        <CodeBlock
                            language="json"
                            content={frequentActivities}
                            filename="frequent-activities.json"
                        />
                    </div>
                    <div className="section">
                        <h2 className="title">Heart Beat for the Week</h2>
                        <CodeBlock
                            language="json"
                            content={weekHeartRate}
                            filename="heart-rate-for-the-week.json"
                        />
                    </div>
                </div>
            </section>
        );
    }
}
