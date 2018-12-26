import {Fragment} from "react";
import MainLayout from "../containers/MainLayout";
import Link from "next/link";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import addSeconds from "date-fns/add_seconds";
import Fitbit from "../api/fitbit.api";
import Devices from "../api/device.api";
import format from "date-fns/format";

const DevicesApi = new Devices();

export default class DevicesPage extends React.Component {
    static async getInitialProps() {
        let devices = [];
        devices = await DevicesApi.getAll();
        const promises = devices.map(device => {
            const FitbitApi = new Fitbit(device.client_id, device.secret, device.access_token);
            device.consent_url = FitbitApi.getConsentUrl();

            return FitbitApi.getDevices().then(devices => {
                return (device = {...device, ...devices[0]});
            });
        });

        return Promise.all(promises).then(devices => {
            return {
                devices
            };
        });
    }

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
                                                    {`${device.client_id} - ${
                                                        device.deviceVersion
                                                    }`}
                                                </p>
                                            </div>
                                            <div className="d-flex flex-column">
                                                {(!device.access_token && (
                                                    <a
                                                        href={device.consent_url}
                                                        onClick={e => e.stopPropagation()}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="button is-primary has-text-uppercase">
                                                        Authenticate
                                                    </a>
                                                )) || (
                                                    <Fragment>
                                                        <p className="has-text-grey-light is-size-7">
                                                            {`Last synced: ${format(
                                                                new Date(device.lastSyncTime),
                                                                "ddd, MMM DD @ hh:mm A"
                                                            )}`}
                                                        </p>
                                                        <p className="has-text-grey-light is-size-7">
                                                            {`${this.getAuthDaysLeft(
                                                                device.authentication_date,
                                                                device.access_token_expiration
                                                            )} left`}
                                                        </p>
                                                    </Fragment>
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
