import React, { createContext, useState, useContext } from 'react';

const ProviderContext = createContext();

export const useProviders = () => useContext(ProviderContext);

export const ProviderProvider = ({ children }) => {
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState({});
    const [selectedPackage, setSelectedPackage] = useState({});

    // Simulate fetching providers
    const fetchProviders = async () => {
        // Placeholder for actual API call
        // const response = await axios.get('https://api.yoursite.com/providers');
        // setProviders(response.data);
        setProviders([
            { id: 1, name: "Health Plus" },
            { id: 2, name: "WellCare" },
            { id: 3, name: "SecureLife" },
        ]);
    };

    return (
        <ProviderContext.Provider value={{
            providers,
            fetchProviders,
            selectedProvider,
            setSelectedProvider,
            selectedPackage,
            setSelectedPackage
        }}>
            {children}
        </ProviderContext.Provider>
    );
};
