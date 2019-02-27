import { SQLProvider } from "./SQLProvider";
import { ProviderEntity } from "./provider/ProviderEntity";

class ProviderFactory {

    static initProvider(providerConfigList){
        if (providerConfigList) {
            for (let i = 0; i < providerConfigList.rowCount; i++) {
                var proivider = new ProviderEntity(providerConfigList.rows[i]);
                ProviderFactory.providerCaceh.set(proivider.providerId, proivider);
            }
        }
    }

    static getProvider(providerId){
        let result = null;
        let provider = ProviderFactory.providerCaceh.get(providerId);
        switch (provider.providerType) {
            case "SQLProvider":
                result = new SQLProvider(provider);
                break;
            case "JSProvider":
                result = new JSProvider(provider);
                break;
            case "FileProvider":
                result = new FileProvider(provider);
                break;
        }
        return result;
    }
}

ProviderFactory.providerCaceh = new Map();

export { ProviderFactory}