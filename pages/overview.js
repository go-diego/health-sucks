import MainLayout from "../containers/MainLayout";
import DeviceData from "../components/DeviceData";
import DeviceDetails from "../components/DeviceDetails";

export default class DeviceDataPage extends React.Component {
    static async getInitialProps({query}) {
        const {id, token, secret} = query;
        return {id, token, secret};
    }

    render() {
        const {id, token, secret} = this.props;
        return (
            <MainLayout>
                <DeviceDetails />
                <DeviceData clientId={id} token={token} secret={secret} />
            </MainLayout>
        );
    }
}
