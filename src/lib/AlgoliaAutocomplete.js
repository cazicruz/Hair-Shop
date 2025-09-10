import React, { useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';

const AlgoliaAutocomplete = ({
    appId,
    apiKey,
    indexName,
    onSelect,
    placeholder = 'Search...',
    className = '',
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const searchClient = algoliasearch(appId, apiKey);

        const autocompleteInstance = autocomplete({
            container: containerRef.current,
            placeholder,
            className,
            getSources() {
                return [
                    {
                        sourceId: 'products',
                        getItems({ query }) {
                            return searchClient
                                .initIndex(indexName)
                                .search(query)
                                .then(res => res.hits);
                        },
                        onSelect({ item }) {
                            if (onSelect) onSelect(item);
                        },
                        templates: {
                            item({ item }) {
                                return `<div>${item.name}</div>`;
                            },
                        },
                    },
                ];
            },
        });

        return () => {
            autocompleteInstance.destroy();
        };
    }, [appId, apiKey, indexName, onSelect, placeholder, className]);

    return <div ref={containerRef} />;
};

export default AlgoliaAutocomplete;