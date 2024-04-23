import React, { useState } from 'react';
import styled from 'styled-components';
import InsuranceProvider from './InsuranceProvider';
import { FaSearch, FaTh, FaList } from 'react-icons/fa';

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  margin-right: 10px;
`;

const SearchBar = styled.input`
  padding: 10px 10px 10px 35px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ccc;
`;

const ViewToggleButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  &.active {
    color: red;
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  flex-direction: ${props => props.view === 'list' ? 'column' : 'row'};
`;


// Mock data
const providersData = [
  { id: 1, name: 'Lifeline Health', specialty: 'General Health', rating: '4.7' },
  { id: 2, name: 'SecureCare', specialty: 'Dental', rating: '4.5' },
  { id: 3, name: 'Turbo-Life', specialty: 'Emergency Care', rating: '4.9' },
  { id: 4, name: 'Anchor Life Saver', specialty: 'General Health', rating: '4.1' },
  { id: 5, name: 'Lifeline Accident Safe', specialty: 'Accidental Care', rating: '3.7' },
  { id: 6, name: 'Assure Medical Insurance', specialty: 'Emergency Care', rating: '4.8' },
  { id: 7, name: 'Lives Saved Insurance', specialty: 'Accidental Care', rating: '4.2' },
  { id: 8, name: 'Dent-health Saviour', specialty: 'Dental', rating: '4.9' },
  { id: 9, name: 'King Life Insurance', specialty: 'General Health', rating: '4.3' },
  // ...continue adding providers until you have 20
];

// ProviderList component
const ProviderList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProviders, setFilteredProviders] = useState(providersData);
    const [view, setView] = useState('grid'); // 'grid' or 'list'
  
    const handleSearch = (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      const filtered = providersData.filter(
        provider => provider.name.toLowerCase().includes(term.toLowerCase()) ||
                    provider.specialty.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProviders(filtered);
    };
  
    return (
      <>
        <Toolbar>
          <SearchBarWrapper>
            <SearchBar
              type="text"
              placeholder="Search by provider, location, or name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchIcon />
          </SearchBarWrapper>
          <ViewToggleButton 
            onClick={() => setView('grid')} 
            className={view === 'grid' ? 'active' : ''}
          >
            <FaTh />
          </ViewToggleButton>
          <ViewToggleButton 
            onClick={() => setView('list')} 
            className={view === 'list' ? 'active' : ''}
          >
            <FaList />
          </ViewToggleButton>
        </Toolbar>
        <Container view={view}>
          {filteredProviders.map(provider => (
            <InsuranceProvider key={provider.id} provider={provider} viewPlans={true} />
          ))}
        </Container>
      </>
    );
  };
  
  export default ProviderList;