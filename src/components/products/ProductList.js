'use client'
import React from 'react'
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch,RefinementList ,SearchBox,Hits,Pagination,Configure} from 'react-instantsearch';
// import AlgoliaAutocomplete from '../../lib/AlgoliaAutocomplete';

const searchClient = algoliasearch('LLSC4VG5FA', '95d46afd21d05c885d07d090eea4ad4f');

function Hit({ hit }) {
  return (
  <ProductCard product={hit} key={hit.id}/>
  );
}

function ProductList({products}) {
  return (
    <>
    <ProductCardContainer>
      <InstantSearch 
        insights={true}
        searchClient={searchClient}
         indexName="B-classy"
         routing={true}>
          <StyledSearchBox>
            <SearchBox />
          </StyledSearchBox>
                  <RefinementList attribute="brand" />

          <ProductGrid>
            <Hits hitComponent={Hit} />
          </ProductGrid>
        <Configure hitsPerPage={10} />
        <StyledPagination>
          <Pagination />
        </StyledPagination>
        </InstantSearch>

      {/* {products.map(product => (
          <ProductCard product={product} key={product.id}/>
      ))} */}
    </ProductCardContainer>
  </>
  )
}

const ProductGrid = styled.div`
  .ais-Hits-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* desktop */
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 1200px;
  }

  .ais-Hits-item {
    list-style: none; /* remove default ul bullets */
  }

  @media (max-width: 1024px) {
    .ais-Hits-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .ais-Hits-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .ais-Hits-list {
      grid-template-columns: 1fr;
    }
  }
`;


const ProductCardContainer = styled.div`
  // border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  // padding: 1rem;
  border-radius: 8px;
`;
const StyledSearchBox = styled.div`
align-self: flex-start;
display: inline;

  input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: ${({ theme }) => theme.colors.inputBg};
    color: ${({ theme }) => theme.colors.text};
    width: 400px;
    margin:5px;

    @media (max-width: 700px) {
      width: 90%;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 0.8rem 1rem;
    height:100%;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 5px;
  }
`;
const StyledPagination = styled.div`
  ul {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }

    &.ais-Pagination-item--selected {
      background-color: red;
    }
  }
`;


export default ProductList