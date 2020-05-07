import Register from '../components/Auth/register';
import Layout from '../components/Layout';
import MaxWidth from '../components/MaxWidth';

const RegisterPage = (props) => {
    return (
        <Layout background={'var(--gradient-teal)'}>
            <MaxWidth>
                <h1>Register Your Account</h1>
                <Register />
            </MaxWidth>
        </Layout>
    );
};
export default RegisterPage;
