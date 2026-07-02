import { useSelector } from "react-redux";

function Home() {

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    return (

        <div>

            <h1 className="text-3xl font-bold">

                {isAuthenticated
                    ? `Welcome ${user.fullname}`
                    : "Welcome Guest"}

            </h1>

        </div>

    );

}

export default Home;