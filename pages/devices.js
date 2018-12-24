import MainLayout from "../containers/MainLayout";
import Link from "next/link";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import addSeconds from "date-fns/add_seconds";
import Fitbit from "../api/fitbit.api";
import Devices from "../api/device.api";

const DevicesApi = new Devices();

export default class DevicesPage extends React.Component {
    static async getInitialProps() {
        const devices = await DevicesApi.getAll();

        return {
            devices
        };
    }

    getConsentUrl = (clientId, secret) => {
        const FitbitApi = new Fitbit(clientId, secret);
        return FitbitApi.getConsentUrl();
    };

    getAuthDaysLeft = (authDate, authPeriod) => {
        const authEndDate = addSeconds(new Date(authDate), authPeriod);
        return distanceInWordsStrict(new Date(authEndDate), new Date());
    };

    render() {
        const {devices} = this.props;
        return (
            <MainLayout>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Devices</h1>
                        <div className="panel">
                            <div className="panel-heading">{`${devices.length} device(s)`}</div>
                            <div className="panel-block">
                                <p className="control has-icons-left">
                                    <input className="input" type="text" placeholder="search" />
                                    <span className="icon is-left">
                                        <i className="fas fa-search" aria-hidden="true" />
                                    </span>
                                </p>
                            </div>
                            {devices.map(device => {
                                return (
                                    <Link
                                        key={device.id}
                                        href={`/data?id=${device.client_id}&token=${
                                            device.access_token
                                        }&secret=${device.secret}`}
                                        as={`/data/${device.client_id}`}>
                                        <label className="panel-block d-flex justify-content-between">
                                            <div className="d-flex flex-column">
                                                <p className="has-text-weight-bold">
                                                    {device.user}
                                                </p>
                                                <p className="has-text-grey-light">
                                                    {device.client_id}
                                                </p>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="has-text-grey-light is-size-7">
                                                    {(!device.access_token &&
                                                        "Not Authenticated") ||
                                                        `${this.getAuthDaysLeft(
                                                            device.authentication_date,
                                                            device.access_token_expiration
                                                        )} left`}
                                                </p>
                                                {!device.access_token && (
                                                    <a
                                                        href={this.getConsentUrl(
                                                            device.client_id,
                                                            device.secret
                                                        )}
                                                        onClick={e => e.stopPropagation()}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="button is-primary has-text-uppercase">
                                                        Authenticate
                                                    </a>
                                                )}
                                            </div>
                                        </label>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }
}
