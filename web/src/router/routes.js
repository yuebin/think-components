import Main from "../components/Main.vue";
import ClientManager from '../components/client-manager/ClientManager';
import ClinetMangerList from '../components/client-manager/ClinetManagerList';
import ClinetMangerFrom from '../components/client-manager/ClinetManagerFrom';
import ClientManagerHttp from '../components/client-manager/ClientManagerHttp';
import AppPortalPanel from '../components/portal/AppPortalPanel';
import Login from '../components/login/Login'

const routes = [
    { path: "/", component: Main,
        children: [
            { path: "/portal", component: AppPortalPanel },
            { path:"clinet",component:ClientManager,children:[
                {path:"list",component: ClinetMangerList},
                { path: "from", component: ClinetMangerFrom },
                { path: "http", component: ClientManagerHttp }
            ]}
        ]},
    {path:"/login",component:Login}
]
export default routes;