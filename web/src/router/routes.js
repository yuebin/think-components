import Main from "../components/Main.vue";
import ClientManager from '../components/client-manager/ClientManager';
import ClinetMangerList from '../components/client-manager/ClinetManagerList';
import ClinetMangerFrom from '../components/client-manager/ClinetManagerFrom';
import ClientManagerHttp from '../components/client-manager/ClientManagerHttp';
import AppPortalPanel from '../components/portal/AppPortalPanel';
import Login from '../components/login/Login'
import TCAppCompoent from "../domain/app/components/App";
import AdminCompoent from "../domain/admin/components/admin";
import DeveloperCompoent from "../domain/dev/components/developer"

const routes = [
    { path: "/portal", component: Main},
    { path:"/login",component:Login},
    { 
        path: "/app", 
        component: TCAppCompoent,
        children:[
            { path: "/main", component: AppPortalPanel },
            {
                path: "clinet", component: ClientManager, children: [
                    { path: "list", component: ClinetMangerList },
                    { path: "from", component: ClinetMangerFrom },
                    { path: "http", component: ClientManagerHttp }
                ]
            }
        ]
    },
    { path: "/adm", component: AdminCompoent },
    { path: "/dev", component: DeveloperCompoent }
]
export default routes;