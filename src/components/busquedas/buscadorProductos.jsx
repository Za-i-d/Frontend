import { useState } from 'react';
import axios from 'axios';

export default function Autocomplete({ placeholder, searchUrl, onSelect }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const response = await axios.get(`${searchUrl}/${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setQuery(suggestion.nombre); // Mostrar el nombre en el campo
        onSelect(suggestion); // Pasar el objeto seleccionado al formulario
        setSuggestions([]); // Limpiar sugerencias
    };

    return (
        <div className="autocomplete">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                className="form-control"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.id} onClick={() => handleSelectSuggestion(suggestion)}>
                            {suggestion.nombre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
