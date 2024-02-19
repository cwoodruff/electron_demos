const electron = !!window.require ? window.require("electron") : undefined;

export const useElectron = () => {
    return electron;
};