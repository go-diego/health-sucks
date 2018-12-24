import MainLayout from "../containers/MainLayout";
import Devices from "../api/device.api";
const DevicesApi = new Devices();

const qs = require("query-string");

export default class ConsentPage extends React.Component {
    state = {
        access_token_expiration: ""
    };

    componentDidMount() {
        const {hash} = window.location;
        const parsedParams = qs.parse(hash);
        const {access_token, state: id, expires_in: access_token_expiration} = parsedParams;
        DevicesApi.set(id, {
            access_token,
            access_token_expiration,
            authentication_date: new Date()
        });
        this.setState({access_token_expiration});
    }

    render() {
        const {access_token_expiration} = this.state;
        return (
            <MainLayout>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Success!</h1>
                        <article className="message is-success">
                            <div className="message-body">
                                <span>Access was given for &nbsp;</span>
                                <b>{`${Math.ceil(
                                    parseInt(access_token_expiration) / 60 / 60 / 24
                                )} days`}</b>
                                .
                            </div>
                        </article>
                    </div>
                </section>
            </MainLayout>
        );
    }
}
